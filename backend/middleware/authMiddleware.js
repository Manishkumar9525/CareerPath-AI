const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  try {
    // 🔐 Get token from header
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided",
      });
    }

    const token = authHeader.replace("Bearer ", "");

    // 🔍 Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🧠 Attach user info
    req.user = { id: decoded.id };

    // 👉 Next middleware
    next();

  } catch (error) {
    console.error("Auth Error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};