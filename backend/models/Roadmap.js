const mongoose = require('mongoose');

// Roadmap Step Schema
const stepSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  skills: [String],
  tools: [String],
  resources: [String],
  projectIdeas: [String],
});

// Roadmap Schema
const roadmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    goal: {
      type: String,
      required: [true, 'Please provide a career goal'],
      trim: true,
    },
    skills: {
      type: String,
      required: [true, 'Please provide current skills'],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, 'Please provide a time duration'],
      trim: true,
    },
    career: {
      type: String,
      trim: true,
    },
    steps: [stepSchema],
    rawAiResponse: {
      type: String,
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
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Roadmap', roadmapSchema);
