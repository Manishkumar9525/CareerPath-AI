const Roadmap = require('../models/Roadmap');
const { generateRoadmapWithGemini } = require('../utils/geminiHelper');

// @route   POST /api/roadmap/generate
// @desc    Generate a career roadmap using Gemini AI
// @access  Private (requires authentication)
exports.generateRoadmap = async (req, res) => {
  try {
    const { goal, skills, duration } = req.body;

    // Validate input
    if (!goal || !skills || !duration) {
      return res.status(400).json({
        success: false,
        message: 'Please provide goal, skills, and duration',
      });
    }

    // Validate input length
    if (goal.length < 5 || goal.length > 200) {
      return res.status(400).json({
        success: false,
        message: 'Goal must be between 5 and 200 characters',
      });
    }

    if (skills.length < 5 || skills.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Skills must be between 5 and 500 characters',
      });
    }

    console.log(`
    ════════════════════════════════════════════════
    🤖 Generating roadmap with Gemini AI
    ════════════════════════════════════════════════
    Goal: ${goal}
    Skills: ${skills}
    Duration: ${duration}
    ════════════════════════════════════════════════
    `);

    // Call Gemini API
    const aiResponse = await generateRoadmapWithGemini(goal, skills, duration);

    if (!aiResponse.success) {
      console.error('AI Response Error:', aiResponse);
      return res.status(500).json({
        success: false,
        message: aiResponse.message,
        debug: process.env.NODE_ENV === 'development' ? aiResponse : undefined,
      });
    }

    // Extract data
    const { data } = aiResponse;

    // Validate AI response structure
    if (!data.steps || !Array.isArray(data.steps) || data.steps.length === 0) {
      return res.status(500).json({
        success: false,
        message: 'Invalid roadmap structure from AI',
      });
    }

    // Save roadmap to database
    const roadmap = await Roadmap.create({
      userId: req.user.id,
      goal,
      skills,
      duration,
      career: data.career || goal,
      steps: data.steps,
      rawAiResponse: JSON.stringify(aiResponse.raw),
    });

    console.log(`✅ Roadmap generated and saved: ${roadmap._id}`);

    // Return response
    res.status(201).json({
      success: true,
      message: aiResponse.isMock
        ? 'Roadmap generated with mock fallback (Gemini error captured)'
        : 'Roadmap generated successfully',
      ai: aiResponse.ai || {
        status: 'success',
        message: null,
      },
      source: aiResponse.isMock ? 'mock' : 'gemini',
      roadmap: {
        id: roadmap._id,
        career: roadmap.career,
        duration: roadmap.duration,
        steps: roadmap.steps,
      },
    });
  } catch (error) {
    console.error('Generate roadmap error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error generating roadmap',
    });
  }
};

// @route   GET /api/roadmap/:id
// @desc    Get a specific roadmap
// @access  Private
exports.getRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: 'Roadmap not found',
      });
    }

    // Check ownership
    if (roadmap.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this roadmap',
      });
    }

    res.status(200).json({
      success: true,
      roadmap,
    });
  } catch (error) {
    console.error('Get roadmap error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error retrieving roadmap',
    });
  }
};

// @route   GET /api/roadmap
// @desc    Get all roadmaps for user
// @access  Private
exports.getUserRoadmaps = async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: roadmaps.length,
      roadmaps,
    });
  } catch (error) {
    console.error('Get user roadmaps error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error retrieving roadmaps',
    });
  }
};

// @route   DELETE /api/roadmap/:id
// @desc    Delete a roadmap
// @access  Private
exports.deleteRoadmap = async (req, res) => {
  try {
    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({
        success: false,
        message: 'Roadmap not found',
      });
    }

    // Check ownership
    if (roadmap.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this roadmap',
      });
    }

    await Roadmap.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Roadmap deleted successfully',
    });
  } catch (error) {
    console.error('Delete roadmap error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting roadmap',
    });
  }
};
