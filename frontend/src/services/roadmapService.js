import axios from "axios";

// ===============================
// 🌐 AXIOS INSTANCE
// ===============================
const API = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000, // 🔥 optional safety
});

// ===============================
// 🔐 REQUEST INTERCEPTOR
// ===============================
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);

// ===============================
// ❗ RESPONSE INTERCEPTOR
// ===============================
API.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn("Unauthorized - token expired");

      // 🔥 optional future:
      // localStorage.clear();
      // window.location.href = "/login";
    }

    return Promise.reject(err);
  }
);

// ===============================
// 🚀 ROADMAP APIs
// ===============================

// ✅ Generate roadmap
export const generateRoadmap = async (data) => {
  const res = await API.post("/roadmap/generate", data);
  return res;
};

// ✅ Get roadmap by ID
export const getRoadmapById = async (id) => {
  const res = await API.get(`/roadmap/${id}`);
  return res;
};

// ✅ Toggle task
export const toggleTask = async (id, data) => {
  const res = await API.patch(`/roadmap/${id}/task`, data);
  return res;
};

// ===============================
// 📊 DASHBOARD APIs
// ===============================

// ✅ Get all user roadmaps
export const getUserRoadmaps = async () => {
  const res = await API.get("/roadmap");
  return res;
};

// ✅ Delete roadmap
export const deleteRoadmap = async (id) => {
  const res = await API.delete(`/roadmap/${id}`);
  return res;
};