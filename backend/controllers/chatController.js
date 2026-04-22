const axios = require("axios");

exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        success: false,
        message: "Message required",
      });
    }

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: "You are a helpful learning assistant.",
          },
          {
            role: "user",
            content: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application",
        },
      }
    );

    const reply = response.data.choices[0].message.content;

    res.json({
      success: true,
      reply,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.response?.data?.error?.message || error.message
    });
  }
};