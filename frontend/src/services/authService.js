import api from "./api";

// ===============================
// 🟢 SIGNUP
// ===============================
export const signupUser = async (data) => {
  try {
    const res = await api.post("/auth/signup", data);
    return res.data;
  } catch (error) {
    console.error("Signup error:", error);

    // 🔥 better error handling
    throw error.response?.data || {
      success: false,
      message: "Signup failed. Please try again.",
    };
  }
};

// ===============================
// 🟡 VERIFY OTP
// ===============================
export const verifyOtp = async (data) => {
  try {
    const res = await api.post("/auth/verify-otp", data);
    return res.data;
  } catch (error) {
    console.error("Verify OTP error:", error);

    throw error.response?.data || {
      success: false,
      message: "OTP verification failed.",
    };
  }
};

// ===============================
// 🔵 LOGIN
// ===============================
export const loginUser = async (data) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (error) {
    console.error("Login error:", error);

    throw error.response?.data || {
      success: false,
      message: "Login failed. Please check credentials.",
    };
  }
};

// ===============================
// 🟠 RESEND OTP
// ===============================
export const resendOtp = async (email) => {
  try {
    const res = await api.post("/auth/resend-otp", { email });
    return res.data;
  } catch (error) {
    console.error("Resend OTP error:", error);

    throw error.response?.data || {
      success: false,
      message: "Failed to resend OTP.",
    };
  }
};