const axios = require("axios");
const Roadmap = require("../models/Roadmap");
const { getAllResources } = require("../utils/resourceService");


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

    const userSkills =
      skills && skills.trim() !== "" ? skills : "beginner";

    const prompt = `
You are a professional career mentor AI.

Create a COMPLETE and DETAILED roadmap for becoming a ${goal}.

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
  "career": "${goal}",
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

    // 🔥 CLEAN RESPONSE
    const cleanJSON = (str) => {
      return str
        .replace(/```json|```/g, "")
        .replace(/\n/g, " ")
        .replace(/,\s*}/g, "}")
        .replace(/,\s*]/g, "]");
    };

    let parsed;

    try {
      const fixed = cleanJSON(data);
      parsed = JSON.parse(fixed);
    } catch (err) {
      console.error("❌ Broken AI JSON:", data);

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

    // ✅ MONTH → ONLY YOUTUBE
    const monthRes = await getAllResources(goal);

    parsed.steps = await Promise.all(
      parsed.steps.map(async (step) => {
        return {
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
        };
      })
    );

    const roadmap = await Roadmap.create({
      userId: req.user.id,
      goal,
      skills: userSkills,
      duration,
      career: parsed.career || goal,
      steps: parsed.steps,
    });

    res.status(201).json({
      success: true,
      roadmap,
    });

  } catch (error) {
    console.error("🔥 Server Error:", error.message);

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
      monthIndex === undefined &&
      weekIndex === undefined &&
      taskIndex !== undefined
    ) {
      monthIndex = 0;
      weekIndex = 0;
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

    let total = 0;
    let done = 0;

    roadmap.steps.forEach((month) => {
      month.weeks.forEach((week) => {
        week.tasks.forEach((task) => {
          total++;
          if (task.completed) done++;
        });
      });
    });

    roadmap.progress = total === 0 ? 0 : Math.round((done / total) * 100);
    roadmap.isCompleted = roadmap.progress === 100;

    await roadmap.save();

    res.json({
      success: true,
      message: "Task updated",
      progress: roadmap.progress,
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
    const roadmaps = await Roadmap.find({ userId: req.user.id });

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