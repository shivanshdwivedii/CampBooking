import api from "./axios";

export const getCampRatings = async (campId) => {
  const response = await api.get(
    `/ratings/camp/${campId}`
  );

  return response.data;
};

export const addRating = async (
  ratingData
) => {
  const response = await api.post(
    "/ratings",
    ratingData
  );

  return response.data;
};

export const updateRating = async (
  id,
  ratingData
) => {
  const response = await api.put(
    `/ratings/${id}`,
    ratingData
  );

  return response.data;
};

export const deleteRating = async (
  id
) => {
  const response = await api.delete(
    `/ratings/${id}`
  );

  return response.data;
};