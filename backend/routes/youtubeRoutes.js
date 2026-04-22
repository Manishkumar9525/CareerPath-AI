const express = require("express");
const router = express.Router();

const { getYouTubeVideos } = require("../controllers/youtubeController");
const { protect } = require("../middleware/authMiddleware");

router.get("/youtube", protect, getYouTubeVideos);

module.exports = router;