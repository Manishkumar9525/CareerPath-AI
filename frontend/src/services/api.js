import axios from "axios";

// ✅ BASE URL FIX (fallback + normalization)
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://careerpath-ai-s2tb.onrender.com/api";

// 🔥 ensure /api duplicate na ho
const normalizedBaseURL = BASE_URL.endsWith("/api")
  ? BASE_URL
  : `${BASE_URL}/api`;

const api = axios.create({
  baseURL: normalizedBaseURL,
  timeout: 10000,
});

// ===============================
// 🔐 REQUEST INTERCEPTOR
// ===============================
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ===============================
// ⚠️ RESPONSE INTERCEPTOR
// ===============================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // 🔥 Token expired / unauthorized
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("currentRoadmapId");

      // optional: redirect (future)
      // window.location.href = "/login";
    }

    // 🌐 Network issue
    if (!error.response) {
      error.message = "Network error: unable to reach the backend.";
    }

    return Promise.reject(error);
  }
);

export default api;