const mongoose = require("mongoose");

// 🔹 RESOURCE SCHEMA
const resourceSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      default: "" 
    },
    url: { 
      type: String, 
      default: "" 
    },
    thumbnail: { 
      type: String, 
      default: "" 
    },
    platform: { 
      type: String, 
      default: "" 
    },
  },
  { _id: false }
);

// 🔹 TASK RESOURCE SCHEMA
const taskResourceSchema = new mongoose.Schema(
  {
    youtube: {
      type: [resourceSchema],
      default: [],
    },
    courses: {
      type: [resourceSchema],
      default: [],
    },
    docs: {
      type: [resourceSchema],
      default: [],
    },
  },
  { _id: false }
);

// 🔹 TASK SCHEMA
const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },

    // 🔥 FIXED DEFAULT
    resources: {
      type: taskResourceSchema,
      default: () => ({
        youtube: [],
        courses: [],
        docs: [],
      }),
    },
  },
  { _id: false }
);

// 🔹 WEEK SCHEMA
const weekSchema = new mongoose.Schema(
  {
    week: {
      type: String,
      required: true,
      trim: true,
    },
    focus: {
      type: String,
      required: true,
      trim: true,
    },

    tasks: {
      type: [taskSchema],
      default: [],
    },

    completed: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false }
);

// 🔹 STEP (MONTH)
const stepSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    tools: {
      type: [String],
      default: [],
    },

    // 🔥 ONLY YOUTUBE
    resources: {
      type: [resourceSchema],
      default: [],
    },

    projectIdeas: {
      type: [String],
      default: [],
    },

    weeks: {
      type: [weekSchema],
      default: [],
    },
  },
  { _id: false }
);

// 🔹 MAIN ROADMAP
const roadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    goal: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },

    skills: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },

    duration: {
      type: String,
      required: true,
      trim: true,
    },

    career: {
      type: String,
      trim: true,
    },

    steps: {
      type: [stepSchema],
      validate: {
        validator: (val) => val && val.length > 0,
        message: "At least one step is required",
      },
    },

    isCompleted: {
      type: Boolean,
      default: false,
    },

    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
  },
  { timestamps: true }
);

// 🔥 INDEX
roadmapSchema.index({ userId: 1, createdAt: -1 });

// 🔹 TOTAL TASKS
roadmapSchema.virtual("totalTasks").get(function () {
  let total = 0;
  this.steps.forEach((month) => {
    month.weeks.forEach((week) => {
      total += week.tasks.length;
    });
  });
  return total;
});

module.exports = mongoose.model("Roadmap", roadmapSchema);