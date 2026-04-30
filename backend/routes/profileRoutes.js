const express = require("express");
const router = express.Router();

const {
  getProfile,
  updateProfile,
  uploadProfileImage,
  deleteProfileImage,
} = require("../controllers/profileController");

const { protect } = require("../middleware/authMiddleware");

// ✅ FIXED ROUTES
router.get("/", protect, getProfile);
router.put("/update", protect, updateProfile);
router.post("/upload-image", protect, uploadProfileImage);
router.delete("/delete-image", protect, deleteProfileImage);

module.exports = router;