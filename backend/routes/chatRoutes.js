const express = require("express");

const router = express.Router();

const {
  chatWithAI,
  getChats,
  getSingleChat,
  deleteChat,
} = require("../controllers/chatController");

const {
  protect,
} = require("../middleware/authMiddleware");


// ======================================================
// 💬 SEND MESSAGE TO AI
// POST /api/chat
// ======================================================
router.post(
  "/",
  protect,
  chatWithAI
);


// ======================================================
// 📋 GET ALL CHATS
// GET /api/chat
// ======================================================
router.get(
  "/",
  protect,
  getChats
);


// ======================================================
// 🔍 GET SINGLE CHAT
// GET /api/chat/:id
// ======================================================
router.get(
  "/:id",
  protect,
  getSingleChat
);


// ======================================================
// 🗑️ DELETE CHAT
// DELETE /api/chat/:id
// ======================================================
router.delete(
  "/:id",
  protect,
  deleteChat
);


module.exports = router;