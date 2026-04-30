const axios = require("axios");
const mongoose = require("mongoose");
const Chat = require("../models/Chat");

// 🔥 SEND MESSAGE (CREATE + CONTINUE CHAT)
exports.chatWithAI = async (req, res) => {
  try {
    const { message, chatId } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message required",
      });
    }

    // ✅ validate chatId
    if (chatId && !mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid chatId",
      });
    }

    let chat;

    // ✅ existing chat
    if (chatId) {
      chat = await Chat.findOne({
        _id: chatId,
        user: req.user.id,
      });
    }

    // ✅ create new chat
    if (!chat) {
      chat = await Chat.create({
        user: req.user.id,
        title:
          message.length > 30
            ? message.slice(0, 30) + "..."
            : message,
        messages: [],
      });
    }

    // ✅ save user message
    chat.messages.push({
      type: "user",
      text: message,
    });

    // ✅ limit history (performance boost)
    const formattedMessages = [
      {
        role: "system",
        content: "You are a helpful learning assistant.",
      },
      ...chat.messages.slice(-20).map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.text,
      })),
    ];

    // ✅ GROQ API call
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: formattedMessages,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // ✅ safe reply
    const reply =
      response.data?.choices?.[0]?.message?.content ||
      "No response from AI";

    // ✅ save bot reply
    chat.messages.push({
      type: "bot",
      text: reply,
    });

    await chat.save();

    // ✅ response
    res.json({
      success: true,
      reply,
      chatId: chat._id,
    });

  } catch (error) {
    console.error("CHAT ERROR:", error.message);

    res.status(500).json({
      success: false,
      message:
        error.response?.data?.error?.message ||
        "Something went wrong",
    });
  }
};



// 🔥 GET ALL CHATS (Sidebar)
exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ user: req.user.id })
      .select("title updatedAt") // ✅ lightweight response
      .sort({ updatedAt: -1 });

    res.json({
      success: true,
      chats,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch chats",
    });
  }
};



// 🔥 GET SINGLE CHAT (Open chat)
exports.getSingleChat = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid chat ID",
      });
    }

    const chat = await Chat.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!chat) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    res.json({
      success: true,
      chat,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching chat",
    });
  }
};



// 🔥 DELETE CHAT
exports.deleteChat = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid chat ID",
      });
    }

    const deleted = await Chat.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Chat not found",
      });
    }

    res.json({
      success: true,
      message: "Chat deleted",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};