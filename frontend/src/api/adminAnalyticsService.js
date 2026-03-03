import api from "../api/axios";

/**
 * 🔥 Fetch full Admin Dashboard
 * Single API call
 */
export const getAdminDashboard = async () => {
  const response = await api.get("/api/admin/dashboard");
  return response.data;
};