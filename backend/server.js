// Load environment variables
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const roadmapRoutes = require('./routes/roadmapRoutes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API working',
    timestamp: new Date().toISOString(),
  });
});

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'Server is running',
    port: process.env.PORT,
  });
});

// Auth Routes
app.use('/api/auth', authRoutes);

// Roadmap Routes
app.use('/api/roadmap', roadmapRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════╗
  ║   CareerPath AI Backend Server         ║
  ║   Server running on port ${PORT}          ║
  ║   Environment: ${process.env.NODE_ENV}           ║
  ╚════════════════════════════════════════╝
  `);
});

module.exports = app;
