import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const getProfile = () => API.get("/profile");

export const updateProfile = (data) =>
  API.put("/profile/update", data);

export const uploadProfileImage = (data) =>
  API.post("/profile/upload-image", data);

export const deleteProfileImage = () =>
  API.delete("/profile/delete-image");