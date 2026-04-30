// Load environment variables
require("dotenv").config();

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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 FILE UPLOAD (VERY IMPORTANT)
app.use(
  fileUpload({
    useTempFiles: true,     // required for tempFilePath
    tempFileDir: "/tmp/",   // folder for temp storage
    limits: { fileSize: 5 * 1024 * 1024 }, // optional (5MB limit)
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
app.get("/api/health", (req, res) => {
  res.json({
    status: "Server is running",
    port: process.env.PORT,
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
  console.error("Error:", err.message);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
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