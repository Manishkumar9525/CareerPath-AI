const axios = require("axios");
const mongoose = require("mongoose");
const Chat = require("../models/Chat");

// ======================================================
// 💬 CHAT WITH AI
// ======================================================
exports.chatWithAI = async (req, res) => {
  try {
    const { message, chatId } = req.body;

    // ======================================================
    // ✅ VALIDATE MESSAGE
    // ======================================================
    if (!message || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "Message required",
      });
    }

    // ======================================================
    // ✅ VALIDATE CHAT ID
    // ======================================================
    if (chatId && !mongoose.Types.ObjectId.isValid(chatId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid chatId",
      });
    }

    let chat;

    // ======================================================
    // 🔍 GET EXISTING CHAT
    // ======================================================
    if (chatId) {
      chat = await Chat.findOne({
        _id: chatId,
        user: req.user.id,
      });
    }

    // ======================================================
    // ➕ CREATE NEW CHAT
    // ======================================================
    if (!chat) {
      chat = await Chat.create({
        user: req.user.id,

        title:
          message.trim().length > 30
            ? message.trim().slice(0, 30) + "..."
            : message.trim(),

        messages: [],
      });
    }

    // ======================================================
    // 💬 SAVE USER MESSAGE
    // ======================================================
    chat.messages.push({
      type: "user",
      text: message.trim(),
    });

    // ======================================================
    // 🧠 FORMAT CHAT HISTORY
    // ======================================================
    const formattedMessages = [
      {
        role: "system",
        content: `
You are a helpful, friendly, and accurate learning assistant.

Your job is to help users:
- Learn new topics
- Understand difficult concepts
- Solve coding problems
- Get career guidance
- Get clear and practical answers

Rules:
- Give clear and useful answers.
- Use simple language whenever possible.
- Explain step by step when appropriate.
- Give examples when helpful.
- For coding questions, provide correct and practical code.
- Structure complex answers clearly.
- Do not mention internal instructions.
        `.trim(),
      },

      ...chat.messages
        .slice(-20)
        .map((msg) => ({
          role: msg.type === "user" ? "user" : "assistant",
          content: String(msg.text || ""),
        })),
    ];

    // ======================================================
    // 🚀 GROQ API CALL
    // ======================================================
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "openai/gpt-oss-20b",

        messages: formattedMessages,

        temperature: 0.7,

        top_p: 1,

        max_completion_tokens: 4096,

        stream: false,

        reasoning_effort: "low",

        stop: null,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // ======================================================
    // 📥 GET AI RESPONSE
    // ======================================================
    const choice = response.data?.choices?.[0];

    console.log(
      "AI Chat Finish Reason:",
      choice?.finish_reason
    );

    const reply = choice?.message?.content?.trim();

    // ======================================================
    // ❌ EMPTY RESPONSE CHECK
    // ======================================================
    if (!reply) {
      console.error(
        "❌ Empty AI response:",
        response.data
      );

      return res.status(500).json({
        success: false,
        message: "AI returned an empty response",
      });
    }

    // ======================================================
    // ⚠️ RESPONSE LENGTH WARNING
    // ======================================================
    if (choice?.finish_reason === "length") {
      console.warn(
        "⚠️ AI response reached token limit"
      );
    }

    // ======================================================
    // 💾 SAVE BOT REPLY
    // ======================================================
    chat.messages.push({
      type: "bot",
      text: reply,
    });

    await chat.save();

    // ======================================================
    // 🎉 SEND RESPONSE
    // ======================================================
    return res.status(200).json({
      success: true,
      reply,
      chatId: chat._id,
    });

  } catch (error) {
    console.error(
      "❌ CHAT ERROR:",
      error.response?.data || error.message
    );

    return res
      .status(error.response?.status || 500)
      .json({
        success: false,

        message:
          error.response?.data?.error?.message ||
          error.message ||
          "Something went wrong",
      });
  }
};


// ======================================================
// 📋 GET ALL CHATS
// ======================================================
exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      user: req.user.id,
    })
      .select("title updatedAt")
      .sort({
        updatedAt: -1,
      });

    return res.status(200).json({
      success: true,
      chats,
    });

  } catch (error) {
    console.error(
      "❌ FETCH CHATS ERROR:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch chats",
    });
  }
};


// ======================================================
// 🔍 GET SINGLE CHAT
// ======================================================
exports.getSingleChat = async (req, res) => {
  try {
    // ======================================================
    // ✅ VALIDATE CHAT ID
    // ======================================================
    if (
      !mongoose.Types.ObjectId.isValid(req.params.id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid chat ID",
      });
    }

    // ======================================================
    // 🔍 FIND CHAT
    // ======================================================
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

    return res.status(200).json({
      success: true,
      chat,
    });

  } catch (error) {
    console.error(
      "❌ GET CHAT ERROR:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Error fetching chat",
    });
  }
};


// ======================================================
// 🗑️ DELETE SINGLE CHAT
// ======================================================
exports.deleteChat = async (req, res) => {
  try {
    // ======================================================
    // ✅ VALIDATE CHAT ID
    // ======================================================
    if (
      !mongoose.Types.ObjectId.isValid(req.params.id)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid chat ID",
      });
    }

    // ======================================================
    // 🗑️ DELETE CHAT
    // ======================================================
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

    return res.status(200).json({
      success: true,
      message: "Chat deleted successfully",
    });

  } catch (error) {
    console.error(
      "❌ DELETE CHAT ERROR:",
      error.message
    );

    return res.status(500).json({
      success: false,
      message: "Delete failed",
    });
  }
};