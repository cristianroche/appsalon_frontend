import api from "@/lib/axios";

export default {
  register: (data) => api.post("/auth/register", data),
  verifyAccount: (token) => api.get(`/auth/verify/${token}`),
  login: (data) => api.post("/auth/login", data),
  auth: () => api.get("/auth/user"),
  admin: () => api.get("/auth/admin"),
  forgotPassword: (data) => api.post("/auth/forgot-password", data),
  verifyPasswordResetToken: (token) =>
    api.get(`/auth/forgot-password/${token}`),
  updatePassword: (token, password) =>
    api.post(`/auth/forgot-password/${token}`, password),
};
