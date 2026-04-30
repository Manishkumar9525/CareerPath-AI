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

    if (!goal || !duration) {
      return res.status(400).json({
        success: false,
        message: "Please provide goal and duration",
      });
    }

    const userId = req.user.id;

    // Normalize inputs to keep duplicate checks consistent.
    const cleanGoal = normalizeText(goal);
    const normalizedGoal = cleanGoal.toLowerCase();
    const cleanDuration = normalizeText(duration);
    const normalizedDuration = cleanDuration.toLowerCase();

    const userSkills =
      skills && skills.trim() !== "" ? normalizeText(skills) : "beginner";

    // Prevent duplicates by matching goal and duration case-insensitively.
    const existing = await Roadmap.findOne({
      userId,
      goal: {
        $regex: new RegExp(`^${escapeRegExp(normalizedGoal)}$`, "i"),
      },
      duration: {
        $regex: new RegExp(`^${escapeRegExp(normalizedDuration)}$`, "i"),
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
    // 🚀 AI GENERATION
    // ======================================================
    const prompt = `
You are a professional career mentor AI.

Create a COMPLETE and DETAILED roadmap for becoming a ${cleanGoal}.

User details:
- Current Skills: ${userSkills}
- Duration: ${duration}

IMPORTANT:
- Return strictly valid JSON
- Do NOT break strings
- Do NOT miss quotes
- Ensure JSON is parseable

STRICT RULES:
- Divide into months
- Each month → 4 weeks
- Each week → 3-6 tasks
- Return ONLY JSON

{
  "career": "${cleanGoal}",
  "steps": [
    {
      "title": "Month 1",
      "description": "Detailed...",
      "skills": [],
      "tools": [],
      "resources": [],
      "projectIdeas": [],
      "weeks": [
        {
          "week": "Week 1",
          "focus": "Topic",
          "tasks": ["Task 1", "Task 2"]
        }
      ]
    }
  ]
}
`;

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let data = response.data.choices[0].message.content;

    // ======================================================
    // 🔧 CLEAN JSON
    // ======================================================
    const cleanJSON = (str) => {
      return str
        .replace(/```json|```/g, "")
        .replace(/\n/g, " ")
        .replace(/,\s*}/g, "}")
        .replace(/,\s*]/g, "]");
    };

    let parsed;

    try {
      parsed = JSON.parse(cleanJSON(data));
    } catch (err) {
      console.error("Broken AI JSON:", data);

      return res.status(500).json({
        success: false,
        message: "AI returned invalid JSON",
      });
    }

    if (!parsed.steps || !Array.isArray(parsed.steps)) {
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
      parsed.steps.map(async (step) => ({
        title: step.title || "Untitled Month",

        description:
          step.description && step.description.length > 10
            ? step.description
            : "This month focuses on building fundamentals.",

        skills: Array.isArray(step.skills) ? step.skills : [],
        tools: Array.isArray(step.tools) ? step.tools : [],

        resources:
          monthRes.youtube.length > 0
            ? monthRes.youtube
            : [{ title: "No videos found", url: "" }],

        projectIdeas: Array.isArray(step.projectIdeas)
          ? step.projectIdeas
          : [],

        weeks: await Promise.all(
          (step.weeks || []).map(async (week, index) => ({
            week: week.week || `Week ${index + 1}`,
            focus: week.focus || "Core concept",

            tasks: await Promise.all(
              (week.tasks || []).map(async (task) => {
                const cleanTopic = task
                  .replace(/learn|understand|study|practice/gi, "")
                  .replace(/\(.*?\)/g, "")
                  .split(",")[0]
                  .trim()
                  .slice(0, 50);

                const res = await getAllResources(cleanTopic);

                return {
                  title: task,
                  completed: false,
                  resources: {
                    youtube:
                      res.youtube.length > 0
                        ? res.youtube
                        : [{ title: "No videos found", url: "" }],

                    courses:
                      res.courses.length > 0
                        ? res.courses
                        : [{ title: "No courses found", url: "" }],

                    docs:
                      res.docs.length > 0
                        ? res.docs
                        : [{ title: "No documentation found", url: "" }],
                  },
                };
              })
            ),

            completed: false,
          }))
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

    res.status(201).json({
      success: true,
      roadmap,
      fromCache: false,
    });

  } catch (error) {
    console.error("Roadmap generation failed:", error.message);

    res.status(500).json({
      success: false,
      message: error.message,
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