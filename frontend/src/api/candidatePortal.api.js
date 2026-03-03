import api from "./axios";

/**
 * GET candidate portal data by token
 */
export const getPortalByToken = async (token) => {
  const res = await api.get(`/api/candidate-portal?token=${token}`);
  return res.data;
};

/**
 * UPDATE candidate profile using token
 */
export const updateProfileByToken = async (token, profileData) => {
  const res = await api.post(
    `/api/candidate-portal/profile?token=${token}`,
    profileData
  );
  return res.data;
};