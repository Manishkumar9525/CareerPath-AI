const requiredEnvVars = [
    "MONGODB_URL",
    "JWT_SECRET",
    "CLOUDINARY_CLOUD_NAME",
    "CLOUDINARY_API_KEY",
    "CLOUDINARY_API_SECRET",
    "GMAIL_USER",
    "GMAIL_PASSWORD",
    "GROQ_API_KEY",
    "YOUTUBE_API_KEY",
];

const validateEnv = () => {
    const missing = [];

    requiredEnvVars.forEach((varName) => {
        if (!process.env[varName]) {
            missing.push(varName);
        }
    });

    if (missing.length > 0) {
        console.error(
            "❌ MISSING ENVIRONMENT VARIABLES:",
            missing.join(", ")
        );
        console.error("Please check your .env file");
        process.exit(1);
    }

    console.log("✅ All required environment variables are set");
};

module.exports = { validateEnv };
