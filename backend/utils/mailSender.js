const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, subject, message) => {
  try {
    // 🔥 Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail", // simpler than host/port
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // 🔍 Verify connection
    await transporter.verify();
    console.log("✅ SMTP connected");

    // 📩 Send mail
    const info = await transporter.sendMail({
      from: `"CareerPath AI" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: subject,

      // Plain + HTML दोनों
      text: message,
      html: `
        <div style="font-family: Arial; text-align:center;">
          <h2 style="color:#4f46e5;">CareerPath AI</h2>
          <p>${message}</p>
        </div>
      `,
    });

    console.log("📨 Mail sent:", info.response);
    console.log("📧 To:", email);

    return info;

  } catch (error) {
    console.error("❌ MAIL ERROR:", error.message);
    throw error;
  }
};

module.exports = mailSender;