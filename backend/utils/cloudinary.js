const { cloudinary } = require("../config/cloudinary");

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

    return response;

  } catch (error) {
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