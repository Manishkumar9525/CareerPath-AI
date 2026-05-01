// Load environment variables
require("dotenv").config();

// ✅ Validate required environment variables
const { validateEnv } = require("./config/env");
validateEnv();

const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

const connectDB = require("./config/db");
const { cloudinaryConnect } = require("./config/cloudinary");

const authRoutes = require("./routes/authRoutes");
const roadmapRoutes = require("./routes/roadmapRoutes");
const testRoutes = require("./routes/testRoutes");
const youtubeRoutes = require("./routes/youtubeRoutes");
const profileRoutes = require("./routes/profileRoutes");
const chatRoutes = require("./routes/chatRoutes");

// Initialize Express app
const app = express();

// 🔥 CONNECT SERVICES
connectDB();
cloudinaryConnect(); // 🔥 IMPORTANT

// Middleware
app.use(cors({
  origin: (origin, callback) => {
    const clientUrl = process.env.CLIENT_URL || "http://localhost:3000";
    const allowedOrigins = clientUrl.split(",").map(url => url.trim());

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// 🔥 FILE UPLOAD (VERY IMPORTANT)
const path = require("path");
const tempDir = process.env.NODE_ENV === "production"
  ? "/tmp/"
  : path.join(__dirname, "temp");

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: tempDir,
    limits: { fileSize: 5 * 1024 * 1024 },
    safeFileNames: true,
    preserveExtensions: true,
  })
);

// Basic Test Route
app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API working",
    timestamp: new Date().toISOString(),
  });
});

// Health check route
const mongoose = require("mongoose");
app.get("/api/health", (req, res) => {
  const isDbConnected = mongoose.connection.readyState === 1;

  if (!isDbConnected) {
    return res.status(503).json({
      status: "Unhealthy",
      database: "disconnected",
      port: process.env.PORT,
    });
  }

  res.json({
    status: "Healthy",
    database: "connected",
    port: process.env.PORT,
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api", testRoutes);
app.use("/api", youtubeRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/chat", chatRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);

  const isDevelopment = process.env.NODE_ENV === "development";
  const statusCode = err.status || err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: isDevelopment ? err.message : "Internal Server Error",
    ...(isDevelopment && { error: err.stack }),
  });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║   CareerPath AI Backend Server         ║
  ║   Server running on port ${PORT}       ║
  ║   Environment: ${process.env.NODE_ENV} ║
  ╚════════════════════════════════════════╝
  `);
});

module.exports = app;