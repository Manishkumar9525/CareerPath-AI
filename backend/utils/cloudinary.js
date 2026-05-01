const { cloudinary } = require("../config/cloudinary");
const fs = require("fs").promises;

exports.uploadImageToCloudinary = async (file, folder) => {
  try {
    const options = {
      folder,
      resource_type: "auto",
    };

    console.log("Uploading file from:", file.tempFilePath);

    const response = await cloudinary.uploader.upload(
      file.tempFilePath,
      options
    );

    // ✅ CLEANUP TEMP FILE
    try {
      await fs.unlink(file.tempFilePath);
    } catch (cleanupError) {
      console.warn("Could not delete temp file:", cleanupError.message);
    }

    return response;
  } catch (error) {
    // ✅ Cleanup on error too
    try {
      await fs.unlink(file.tempFilePath);
    } catch (e) {
      // Ignore cleanup errors
    }
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

// ✅ DELETE
exports.deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return;

    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};