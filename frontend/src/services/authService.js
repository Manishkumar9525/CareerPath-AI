import api from "./api";

// SIGNUP
export const signupUser = async (data) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

// VERIFY OTP
export const verifyOtp = async (data) => {
  const res = await api.post("/auth/verify-otp", data);
  return res.data;
};

// LOGIN
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// RESEND OTP
export const resendOtp = async (email) => {
  const res = await api.post("/auth/resend-otp", { email });
  return res.data;
};