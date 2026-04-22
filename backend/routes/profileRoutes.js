const express = require("express");
const router = express.Router();

const { getProfileStats } = require("../controllers/profileController");
const { protect } = require("../middleware/authMiddleware"); // ✅ FIX

router.get("/", protect, getProfileStats);

module.exports = router;