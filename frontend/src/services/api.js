import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_API_URL ||
  "https://careerpath-ai-s2tb.onrender.com/api";

const cleanedBase = BASE_URL.replace(/\/+$/g, "");
const normalizedBaseURL = cleanedBase.endsWith("/api")
  ? cleanedBase
  : `${cleanedBase}/api`;

const api = axios.create({
  baseURL: normalizedBaseURL,
  timeout: 20000, // 🔥 increased
});

// REQUEST
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

// RESPONSE
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.clear();
      // window.location.href = "/login"; // optional
    }

    if (!error.response) {
      console.error("Network Error Details:", error);
      error.message = "Server not responding or network issue.";
    }

    return Promise.reject(error);
  }
);

export default api;