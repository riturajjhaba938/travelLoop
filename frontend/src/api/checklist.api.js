import api from './axios';

export const getChecklist = async (tripId) => {
  const { data } = await api.get(`/checklist/trip/${tripId}`);
  return data;
};

export const addChecklistItem = async (tripId, itemData) => {
  const { data } = await api.post(`/checklist/trip/${tripId}`, itemData);
  return data;
};

export const toggleChecklistItem = async (itemId, isChecked) => {
  const { data } = await api.put(`/checklist/item/${itemId}`, { is_checked: isChecked });
  return data;
};

export const deleteChecklistItem = async (itemId) => {
  const { data } = await api.delete(`/checklist/item/${itemId}`);
  return data;
};
