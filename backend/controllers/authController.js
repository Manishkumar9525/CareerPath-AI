const User = require("../models/User");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");

// 🔐 Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// ================== SIGNUP ==================
exports.signup = async (req, res) => {
  try {
    const { name, email, password, passwordConfirm } = req.body;

    // ✅ Validation
    if (!name || !email || !password || !passwordConfirm) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (password !== passwordConfirm) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    let user = await User.findOne({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ===============================
    // 🟡 USER EXISTS (NOT VERIFIED)
    // ===============================
    if (user && !user.isVerified) {
      user.otp = otp;
      user.otpExpiry = Date.now() + 5 * 60 * 1000;
      await user.save();

      res.json({
        success: true,
        message: "OTP resent. Please verify your email",
      });

      mailSender(email, "CareerPath OTP", `Your OTP is ${otp}`)
        .catch(err => console.error("Mail error:", err.message));

      return; // 🔥 VERY IMPORTANT
    }

    // ===============================
    // 🔴 USER EXISTS (VERIFIED)
    // ===============================
    if (user && user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // ===============================
    // 🟢 NEW USER
    // ===============================
    user = await User.create({
      name,
      email,
      password,
      otp,
      otpExpiry: Date.now() + 5 * 60 * 1000,
      isVerified: false,
    });

    res.status(201).json({
      success: true,
      message: "OTP sent to email. Please verify",
    });

    mailSender(email, "CareerPath OTP", `Your OTP is ${otp}`)
      .catch(err => console.error("Mail error:", err.message));

  } catch (error) {
    console.error("Signup Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Signup failed",
    });
  }
};

// ================== VERIFY OTP ==================
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    // ✅ Verify user
    user.isVerified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();

    res.json({
      success: true,
      message: "Account verified successfully",
    });

  } catch (error) {
    console.error("OTP Error:", error.message);

    res.status(500).json({
      success: false,
      message: "OTP verification failed",
    });
  }
};

// ================== LOGIN ==================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    if (!user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify OTP first",
      });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Login Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

// ================== RESEND OTP ==================
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email required",
      });
    }

    const user = await User.findOne({ email });

    if (!user || user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    res.status(201).json({
      success: true,
      message: "OTP sent to email. Please verify",
    });

    // 🔥 send email AFTER response (non-blocking)
    mailSender(email, "CareerPath OTP", `Your OTP is ${otp}`)
      .catch(err => console.error("Mail error:", err.message));

  } catch (error) {
    console.error("Resend OTP Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Failed to resend OTP",
    });
  }
};