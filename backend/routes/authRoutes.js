const express = require("express");

console.log("authRoutes loaded");

const {
  signup,
  login,
  verifyOTP,
  resendOTP,
  deleteAccount,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// ================== PUBLIC ROUTES ==================

router.get("/debug", (req, res) =>
  res.send("auth route working")
);

router.post("/signup", signup);

router.post("/verify-otp", verifyOTP);

router.post("/login", login);

router.post("/resend-otp", resendOTP);


// ================== PROTECTED ROUTES ==================

router.get("/me", protect, (req, res) => {
  res.json({
    success: true,
    message: "This is a protected route",
    userId: req.user.id,
  });
});


// 🗑️ DELETE ACCOUNT
router.delete(
  "/delete-account",
  protect,
  deleteAccount
);


module.exports = router;