const express = require('express');
const {
  generateRoadmap,
  getRoadmap,
  getUserRoadmaps,
  deleteRoadmap,
  toggleTask,
} = require('../controllers/roadmapController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All routes are protected (require JWT)
router.use(protect);

// Generate new roadmap
router.post('/generate', generateRoadmap);

// Get all user roadmaps
router.get('/', getUserRoadmaps);

// Get specific roadmap
router.get('/:id', getRoadmap);

// Delete roadmap
router.delete('/:id', deleteRoadmap);

router.patch('/:id/task', toggleTask);

module.exports = router;
