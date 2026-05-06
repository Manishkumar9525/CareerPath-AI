const nodemailer = require("nodemailer");
require("dotenv").config();

// ✅ Create transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

// ✅ Send Mail Function
const mailSender = async (email, subject, message) => {
  try {
    console.log("📩 Sending mail to:", email);

    const info = await transporter.sendMail({
      from: `"CareerPath AI" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: subject,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; text-align:center; padding:20px;">
          <h2 style="color:#4f46e5;">CareerPath AI</h2>
          <p style="font-size:16px;">${message}</p>
        </div>
      `,
    });

    console.log("✅ Mail sent:", info.response);
    return info;

  } catch (error) {
    console.error("❌ MAIL ERROR:", error);

    return null;
  }
};

module.exports = mailSender;