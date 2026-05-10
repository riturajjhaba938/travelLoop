import api from './axios';

export const getSections = async (tripId) => {
  const { data } = await api.get(`/sections/trip/${tripId}`);
  return data;
};

export const createSection = async (tripId, sectionData) => {
  const { data } = await api.post(`/sections/trip/${tripId}`, sectionData);
  return data;
};

export const updateSection = async (sectionId, sectionData) => {
  const { data } = await api.put(`/sections/${sectionId}`, sectionData);
  return data;
};

export const deleteSection = async (sectionId) => {
  const { data } = await api.delete(`/sections/${sectionId}`);
  return data;
};
