import api from './axios';

export const getNotes = async (tripId) => {
  const { data } = await api.get(`/notes/trip/${tripId}`);
  return data;
};

export const createNote = async (tripId, noteData) => {
  const { data } = await api.post(`/notes/trip/${tripId}`, noteData);
  return data;
};

export const updateNote = async (noteId, noteData) => {
  const { data } = await api.put(`/notes/item/${noteId}`, noteData);
  return data;
};

export const deleteNote = async (noteId) => {
  const { data } = await api.delete(`/notes/item/${noteId}`);
  return data;
};
