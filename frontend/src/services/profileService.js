import api from "./api";

export const getProfile = async () => {
  try {
    return await api.get("/profile");
  } catch (error) {
    console.error("Get profile error:", error.message);
    throw error;
  }
};

export const updateProfile = async (data) => {
  try {
    return await api.put("/profile/update", data);
  } catch (error) {
    console.error("Update profile error:", error.message);
    throw error;
  }
};

export const uploadProfileImage = async (data) => {
  try {
    return await api.post("/profile/upload-image", data);
  } catch (error) {
    console.error("Upload profile image error:", error.message);
    throw error;
  }
};

export const deleteProfileImage = async () => {
  try {
    return await api.delete("/profile/delete-image");
  } catch (error) {
    console.error("Delete profile image error:", error.message);
    throw error;
  }
};