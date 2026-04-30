const Roadmap = require("../models/Roadmap");
const User = require("../models/User");
const { uploadImageToCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");

// ===============================
// ✅ GET PROFILE (USER + STATS)
// ===============================
exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId).select(
      "name email avatar bio location career"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const roadmaps = await Roadmap.find({ userId })
      .select("steps progress isCompleted");

    let totalRoadmaps = roadmaps.length;
    let totalTasks = 0;
    let completedTasks = 0;
    let completedRoadmaps = 0;

    roadmaps.forEach((roadmap) => {
      if (roadmap.isCompleted) completedRoadmaps++;

      (roadmap.steps || []).forEach((month) => {
        (month.weeks || []).forEach((week) => {
          (week.tasks || []).forEach((task) => {
            totalTasks++;
            if (task.completed) completedTasks++;
          });
        });
      });
    });

    const progress =
      totalTasks === 0
        ? 0
        : Math.round((completedTasks / totalTasks) * 100);

    const avgProgress =
      roadmaps.length === 0
        ? 0
        : Math.round(
          roadmaps.reduce((acc, r) => acc + (r.progress || 0), 0) /
          roadmaps.length
        );

    res.json({
      success: true,
      user,
      stats: {
        totalRoadmaps,
        completedRoadmaps,
        totalTasks,
        completedTasks,
        progress,
        avgProgress,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// ✏️ UPDATE PROFILE (SMART SAFE)
// ===============================
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const { name, bio, location, career } = req.body;

    const updateData = {};

    if (name !== undefined) updateData.name = String(name).trim();
    if (bio !== undefined) updateData.bio = String(bio).trim();
    if (location !== undefined) updateData.location = String(location).trim();
    if (career !== undefined) updateData.career = String(career).trim();

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No changes provided",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select("name email avatar bio location career");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "Changes saved successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// 🖼️ UPLOAD PROFILE IMAGE
// ===============================
exports.uploadProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!req.files || !req.files.image) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded",
      });
    }

    const file = req.files.image;

    // 🔥 upload via util
    const result = await uploadImageToCloudinary(
      file,
      "careerpath/profile"
    );

    // 🔥 delete old image (IMPORTANT)
    const existingUser = await User.findById(userId);

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (existingUser.avatarPublicId) {
      await deleteFromCloudinary(existingUser.avatarPublicId);
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        avatar: result.secure_url,
        avatarPublicId: result.public_id, // 🔥 FIX
      },
      { new: true }
    ).select("name email avatar bio location career");

    res.json({
      success: true,
      message: "Image uploaded successfully",
      avatar: result.secure_url,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===============================
// ❌ DELETE PROFILE IMAGE
// ===============================
exports.deleteProfileImage = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.avatarPublicId) {
      return res.json({
        success: true,
        message: "No image to delete",
      });
    }

    // 🔥 SAFE DELETE
    await deleteFromCloudinary(user.avatarPublicId);

    user.avatar = "";
    user.avatarPublicId = "";

    await user.save();

    res.json({
      success: true,
      message: "Profile image deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};