import api from "./api";

// ===============================
// 🚀 ROADMAP APIs
// ===============================

// ✅ Generate roadmap
export const generateRoadmap = async (data) => {
  try {
    const res = await api.post("/roadmap/generate", data);
    return res;
  } catch (error) {
    console.error("Generate roadmap error:", error.message);
    throw error;
  }
};

// ✅ Get roadmap by ID
export const getRoadmapById = async (id) => {
  try {
    const res = await api.get(`/roadmap/${id}`);
    return res;
  } catch (error) {
    console.error("Get roadmap error:", error.message);
    throw error;
  }
};

// ✅ Toggle task
export const toggleTask = async (id, data) => {
  try {
    const res = await api.patch(`/roadmap/${id}/task`, data);
    return res;
  } catch (error) {
    console.error("Toggle task error:", error.message);
    throw error;
  }
};

// ===============================
// 📊 DASHBOARD APIs
// ===============================

// ✅ Get all user roadmaps
export const getUserRoadmaps = async () => {
  try {
    const res = await api.get("/roadmap");
    return res;
  } catch (error) {
    console.error("Get roadmaps error:", error.message);
    throw error;
  }
};

// ✅ Delete roadmap
export const deleteRoadmap = async (id) => {
  try {
    const res = await api.delete(`/roadmap/${id}`);
    return res;
  } catch (error) {
    console.error("Delete roadmap error:", error.message);
    throw error;
  }
};