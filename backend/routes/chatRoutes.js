const express = require("express");
const router = express.Router();

const {
  chatWithAI,
  getChats,
  getSingleChat,
  deleteChat,
} = require("../controllers/chatController");

const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, chatWithAI);
router.get("/", protect, getChats);
router.get("/:id", protect, getSingleChat);
router.delete("/:id", protect, deleteChat);

module.exports = router;