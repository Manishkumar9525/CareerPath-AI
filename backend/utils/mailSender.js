const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const isApiKeyPresent = !!process.env.SENDGRID_API_KEY;
const isSenderPresent = !!process.env.SENDGRID_EMAIL;

if (!isApiKeyPresent || !isSenderPresent) {
  if (!isApiKeyPresent) console.error("❌ Missing SENDGRID_API_KEY");
  if (!isSenderPresent) console.error("❌ Missing SENDGRID_EMAIL");
  console.error("❌ Missing SendGrid environment variables");
} else {
  try {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    console.log("✅ SendGrid initialized");
  } catch (err) {
    console.error("❌ Failed to initialize SendGrid:", err && err.message ? err.message : err);
  }
}

const mailSender = async (email, subject, message) => {
  console.log(`✅ Sending mail to: ${email}`);

  if (!isApiKeyPresent || !isSenderPresent) {
    console.error("❌ MAIL ERROR: Missing SendGrid configuration");
    return null;
  }

  const msg = {
    to: email,
    from: process.env.SENDGRID_EMAIL,
    subject: subject,
    text: message,
    html: `
      <div style="font-family: Arial, sans-serif; text-align:center; padding:20px;">
        <h2 style="color:#4f46e5;">CareerPath AI</h2>
        <p style="font-size:16px;">${message}</p>
      </div>
    `,
  };

  try {
    console.log("✅ API Key Loaded");
    console.log("✅ Recipient:", email);
    console.log("✅ Subject:", subject);

    const response = await sgMail.send(msg);

    const status = response && response[0] && response[0].statusCode;
    console.log("✅ Mail Sent Successfully", status ? `Status: ${status}` : "");

    return response;
  } catch (error) {
    console.error("❌ MAIL ERROR:", error && error.message ? error.message : error);
    console.error("❌ ERROR MESSAGE:", error && error.message ? error.message : "No message available");

    if (error && error.response && error.response.body) {
      try {
        console.error("❌ SENDGRID RESPONSE:", JSON.stringify(error.response.body));
      } catch (e) {
        console.error("❌ SENDGRID RESPONSE (raw):", error.response.body);
      }
    }

    // Network/timeout detection
    if (error && (error.code === 'ETIMEDOUT' || error.code === 'ECONNRESET' || error.code === 'ENOTFOUND')) {
      console.error("❌ Network Error:", error.code);
    }

    return null;
  }
};

module.exports = mailSender;