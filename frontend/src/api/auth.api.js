import api from "./axios";

export const loginApi = async (email, password) => {
  const res = await api.post("/api/auth/login", {
    email,
    password,
  });

  return res.data; // return full object
};
