import api from "./api";

// SIGNUP
export const signupUser = async (data) => {
  try {
    const res = await api.post("/auth/signup", data);
    return res.data;
  } catch (error) {
    console.error("Signup error:", error.message);
    throw error;
  }
};

// VERIFY OTP
export const verifyOtp = async (data) => {
  try {
    const res = await api.post("/auth/verify-otp", data);
    return res.data;
  } catch (error) {
    console.error("Verify OTP error:", error.message);
    throw error;
  }
};

// LOGIN
export const loginUser = async (data) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (error) {
    console.error("Login error:", error.message);
    throw error;
  }
};

// RESEND OTP
export const resendOtp = async (email) => {
  try {
    const res = await api.post("/auth/resend-otp", { email });
    return res.data;
  } catch (error) {
    console.error("Resend OTP error:", error.message);
    throw error;
  }
};