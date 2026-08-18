const axios = require("axios");
const Roadmap = require("../models/Roadmap");
const { getAllResources } = require("../utils/resourceService");

const normalizeText = (value = "") =>
  value
    .trim()
    .replace(/\s+/g, " ");

const escapeRegExp = (value = "") =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const computeRoadmapProgress = (steps = []) => {
  let totalTasks = 0;
  let completedTasks = 0;

  steps.forEach((month) => {
    (month.weeks || []).forEach((week) => {
      (week.tasks || []).forEach((task) => {
        totalTasks += 1;
        if (task.completed) {
          completedTasks += 1;
        }
      });
    });
  });

  return {
    totalTasks,
    completedTasks,
    progress:
      totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100),
  };
};


// ================== GENERATE ROADMAP ==================
exports.generateRoadmap = async (req, res) => {
  try {
    const { goal, skills, duration } = req.body;

    // ======================================================
    // ✅ VALIDATION
    // ======================================================
    if (!goal || !duration) {
      return res.status(400).json({
        success: false,
        message: "Please provide goal and duration",
      });
    }

    const userId = req.user.id;

    // ======================================================
    // 🧹 NORMALIZE INPUTS
    // ======================================================
    const cleanGoal = normalizeText(goal);
    const normalizedGoal = cleanGoal.toLowerCase();

    const cleanDuration = normalizeText(duration);
    const normalizedDuration = cleanDuration.toLowerCase();

    const userSkills =
      skills && skills.trim() !== ""
        ? normalizeText(skills)
        : "beginner";

    // ======================================================
    // 🔍 PREVENT DUPLICATE ROADMAPS
    // ======================================================
    const existing = await Roadmap.findOne({
      userId,
      goal: {
        $regex: new RegExp(
          `^${escapeRegExp(normalizedGoal)}$`,
          "i"
        ),
      },
      duration: {
        $regex: new RegExp(
          `^${escapeRegExp(normalizedDuration)}$`,
          "i"
        ),
      },
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: "Roadmap already exists",
        roadmap: existing,
        fromCache: true,
      });
    }

    // ======================================================
    // 🤖 AI PROMPT
    // ======================================================
    const prompt = `
Create a complete and detailed career roadmap.

Career Goal: ${cleanGoal}

Current Skills: ${userSkills}

Duration: ${cleanDuration}

STRICT RULES:

1. Divide the roadmap according to the provided duration.
2. Each month must contain exactly 4 weeks.
3. Each week must contain 3 to 5 practical tasks.
4. Tasks must be short, specific, and actionable.
5. Include relevant skills.
6. Include relevant tools.
7. Include project ideas.
8. Keep descriptions concise.
9. Do not generate unnecessary long explanations.

IMPORTANT:

Return ONLY valid JSON.

Do not return:
- Markdown
- Code fences
- Comments
- Explanations before JSON
- Explanations after JSON

The response must follow exactly this structure:

{
  "career": "${cleanGoal}",
  "steps": [
    {
      "title": "Month 1",
      "description": "Short description",
      "skills": ["Skill 1", "Skill 2"],
      "tools": ["Tool 1", "Tool 2"],
      "resources": [],
      "projectIdeas": ["Project idea"],
      "weeks": [
        {
          "week": "Week 1",
          "focus": "Topic",
          "tasks": [
            "Task 1",
            "Task 2",
            "Task 3"
          ]
        },
        {
          "week": "Week 2",
          "focus": "Topic",
          "tasks": [
            "Task 1",
            "Task 2",
            "Task 3"
          ]
        },
        {
          "week": "Week 3",
          "focus": "Topic",
          "tasks": [
            "Task 1",
            "Task 2",
            "Task 3"
          ]
        },
        {
          "week": "Week 4",
          "focus": "Topic",
          "tasks": [
            "Task 1",
            "Task 2",
            "Task 3"
          ]
        }
      ]
    }
  ]
}
`;

    // ======================================================
    // 🚀 GROQ AI GENERATION
    // ======================================================
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "openai/gpt-oss-20b",

        messages: [
          {
            role: "system",
            content: `
You are a professional career mentor.

Generate structured career roadmaps.

You MUST return only valid JSON.

Never include markdown.
Never include code fences.
Never include explanations outside JSON.
Never include comments.

Keep the response concise enough to complete fully.
            `.trim(),
          },
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.7,

        top_p: 1,

        // 🔥 IMPORTANT: roadmap response ko cut hone se bachata hai
        max_completion_tokens: 12000,

        // Complete response ek saath chahiye
        stream: false,

        // GPT-OSS reasoning
        reasoning_effort: "low",

        // Force valid JSON
        response_format: {
          type: "json_object",
        },

        stop: null,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // ======================================================
    // 📥 GET AI RESPONSE
    // ======================================================
    const choice = response.data?.choices?.[0];

    const data = choice?.message?.content;

    console.log(
      "AI Finish Reason:",
      choice?.finish_reason
    );

    // ======================================================
    // ❌ EMPTY RESPONSE CHECK
    // ======================================================
    if (!data) {
      console.error(
        "❌ Empty AI response:",
        response.data
      );

      return res.status(500).json({
        success: false,
        message: "AI returned an empty response",
      });
    }

    // ======================================================
    // ⚠️ CHECK IF RESPONSE WAS CUT OFF
    // ======================================================
    if (choice?.finish_reason === "length") {
      console.error(
        "❌ AI response was cut off due to token limit"
      );

      return res.status(500).json({
        success: false,
        message:
          "AI response was too long. Please try generating again.",
      });
    }

    // ======================================================
    // 🔧 CLEAN JSON
    // ======================================================
    const cleanJSON = (str) => {
      return String(str)
        .trim()
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/\s*```$/i, "")
        .trim();
    };

    // ======================================================
    // 🔄 PARSE AI RESPONSE
    // ======================================================
    let parsed;

    try {
      parsed = JSON.parse(cleanJSON(data));
    } catch (err) {
      console.error(
        "❌ Broken AI JSON:",
        data
      );

      console.error(
        "❌ JSON Parse Error:",
        err.message
      );

      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
      });
    }

    // ======================================================
    // ✅ VALIDATE ROADMAP STRUCTURE
    // ======================================================
    if (
      !parsed ||
      !parsed.steps ||
      !Array.isArray(parsed.steps)
    ) {
      console.error(
        "❌ Invalid roadmap structure:",
        parsed
      );

      return res.status(500).json({
        success: false,
        message: "Invalid roadmap structure",
      });
    }

    // ======================================================
    // 🎯 RESOURCE ENRICHMENT
    // ======================================================
    const monthRes = await getAllResources(cleanGoal);

    parsed.steps = await Promise.all(
      parsed.steps.map(async (step, monthIndex) => ({
        title: step.title || `Month ${monthIndex + 1}`,

        description:
          step.description &&
          step.description.length > 10
            ? step.description
            : "This month focuses on building fundamentals.",

        skills: Array.isArray(step.skills)
          ? step.skills
          : [],

        tools: Array.isArray(step.tools)
          ? step.tools
          : [],

        resources:
          monthRes?.youtube &&
          monthRes.youtube.length > 0
            ? monthRes.youtube
            : [
                {
                  title: "No videos found",
                  url: "",
                },
              ],

        projectIdeas: Array.isArray(
          step.projectIdeas
        )
          ? step.projectIdeas
          : [],

        weeks: await Promise.all(
          (step.weeks || []).map(
            async (week, weekIndex) => ({
              week:
                week.week ||
                `Week ${weekIndex + 1}`,

              focus:
                week.focus ||
                "Core concept",

              tasks: await Promise.all(
                (week.tasks || []).map(
                  async (task) => {
                    const taskString = String(task);

                    // ==========================================
                    // 🧹 CLEAN TASK TOPIC
                    // ==========================================
                    const cleanTopic = taskString
                      .replace(
                        /learn|understand|study|practice/gi,
                        ""
                      )
                      .replace(/\(.*?\)/g, "")
                      .split(",")[0]
                      .trim()
                      .slice(0, 50);

                    // ==========================================
                    // 🔍 GET TASK RESOURCES
                    // ==========================================
                    const taskResources =
                      await getAllResources(
                        cleanTopic || cleanGoal
                      );

                    return {
                      title: taskString,

                      completed: false,

                      resources: {
                        youtube:
                          taskResources?.youtube &&
                          taskResources.youtube.length > 0
                            ? taskResources.youtube
                            : [
                                {
                                  title:
                                    "No videos found",
                                  url: "",
                                },
                              ],

                        courses:
                          taskResources?.courses &&
                          taskResources.courses.length > 0
                            ? taskResources.courses
                            : [
                                {
                                  title:
                                    "No courses found",
                                  url: "",
                                },
                              ],

                        docs:
                          taskResources?.docs &&
                          taskResources.docs.length > 0
                            ? taskResources.docs
                            : [
                                {
                                  title:
                                    "No documentation found",
                                  url: "",
                                },
                              ],
                      },
                    };
                  }
                )
              ),

              completed: false,
            })
          )
        ),
      }))
    );

    // ======================================================
    // 💾 SAVE ROADMAP
    // ======================================================
    const roadmap = await Roadmap.create({
      userId,
      goal: normalizedGoal,
      skills: userSkills,
      duration: cleanDuration,
      career: cleanGoal,
      steps: parsed.steps,
    });

    // ======================================================
    // 🎉 SUCCESS RESPONSE
    // ======================================================
    return res.status(201).json({
      success: true,
      roadmap,
      fromCache: false,
    });

  } catch (error) {
    console.error(
      "❌ Roadmap generation failed:",
      error.response?.data || error.message
    );

    return res.status(
      error.response?.status || 500
    ).json({
      success: false,
      message:
        error.response?.data?.error?.message ||
        error.message ||
        "Failed to generate roadmap",
    });
  }
};

// ================== TOGGLE TASK ==================
exports.toggleTask = async (req, res) => {
  try {
    const { id } = req.params;
    let { monthIndex, weekIndex, taskIndex } = req.body;

    if (taskIndex === undefined || taskIndex === null) {
      return res.status(400).json({
        success: false,
        message: "taskIndex is required",
      });
    }

    monthIndex = Number.isInteger(monthIndex) ? monthIndex : Number(monthIndex);
    weekIndex = Number.isInteger(weekIndex) ? weekIndex : Number(weekIndex);
    taskIndex = Number.isInteger(taskIndex) ? taskIndex : Number(taskIndex);

    const roadmap = await Roadmap.findById(id);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    if (roadmap.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    let task;

    if (
      Number.isNaN(monthIndex) &&
      Number.isNaN(weekIndex) &&
      !Number.isNaN(taskIndex)
    ) {
      monthIndex = 0;
      weekIndex = 0;
    }

    if (
      Number.isNaN(monthIndex) ||
      Number.isNaN(weekIndex) ||
      Number.isNaN(taskIndex)
    ) {
      return res.status(400).json({
        success: false,
        message: "monthIndex, weekIndex and taskIndex must be valid numbers",
      });
    }

    task =
      roadmap.steps?.[monthIndex]?.weeks?.[weekIndex]?.tasks?.[taskIndex];

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Invalid indexes",
      });
    }

    task.completed = !task.completed;

    const week = roadmap.steps[monthIndex].weeks[weekIndex];
    week.completed = week.tasks.every((t) => t.completed);

    const progressStats = computeRoadmapProgress(roadmap.steps || []);

    roadmap.progress = progressStats.progress;
    roadmap.isCompleted = roadmap.progress === 100;

    await roadmap.save();

    res.json({
      success: true,
      message: "Task updated",
      roadmap,
      progress: roadmap.progress,
      stats: {
        totalTasks: progressStats.totalTasks,
        completedTasks: progressStats.completedTasks,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================== GET SINGLE ROADMAP ==================
exports.getRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    if (roadmap.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    res.json({
      success: true,
      roadmap,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ================== GET ALL ROADMAPS ==================
exports.getUserRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ userId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      roadmaps,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================== DELETE ROADMAP ==================
exports.deleteRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: "Roadmap not found",
      });
    }

    if (roadmap.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Not authorized",
      });
    }

    await Roadmap.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Roadmap deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};