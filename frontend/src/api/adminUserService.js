import api from "./axios";

// Get all users
export const getAllUsers = async () => {
  const res = await api.get("/api/admin/users");
  return res.data;
};

// Create user
export const createUser = async (data) => {
  const res = await api.post("/api/admin/users", data);
  return res.data;
};

// Get all roles
export const getRoles = async () => {
  const res = await api.get("/api/admin/roles");
  return res.data;
};

// Get all business units
export const getBusinessUnits = async () => {
  const res = await api.get("/api/admin/business-units");
  return res.data;
};