const nodemailer = require("nodemailer");
require("dotenv").config();

const mailSender = async (email, subject, message) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // ❌ REMOVE THIS (VERY IMPORTANT)
    // await transporter.verify();

    console.log("📩 Sending mail to:", email);

    const info = await transporter.sendMail({
      from: `"CareerPath AI" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: subject,
      text: message,
      html: `
        <div style="font-family: Arial; text-align:center;">
          <h2 style="color:#4f46e5;">CareerPath AI</h2>
          <p>${message}</p>
        </div>
      `,
    });

    console.log("✅ Mail sent:", info.response);
    return info;

  } catch (error) {
    console.error("❌ MAIL ERROR:", error.message);

    // ❌ DON'T throw
    return null;
  }
};

module.exports = mailSender;