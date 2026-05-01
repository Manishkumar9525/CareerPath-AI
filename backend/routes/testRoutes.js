const express = require("express");
const router = express.Router();

const { testGroq } = require("../controllers/testController");
const { protect } = require("../middleware/authMiddleware");

// Protected route - requires authentication
router.get("/test-groq", protect, testGroq);

module.exports = router;