const axios = require("axios");

exports.testGroq = async (req, res) => {
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "user", content: "Hello" }
        ]
        
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`
        }
      }
    );

    res.json({
      success: true,
      data: response.data
    });

  } catch (error) {
    console.error("Groq Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Groq API failed",
      error: error.message
    });
  }
};