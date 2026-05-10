import api from './axios';
import { MOCK_FEATURED_TRIPS, delay } from '../mock/data';

export const getTrips = async () => {
  const { data } = await api.get('/trips');
  return data;
};

export const getTripById = async (id) => {
  const { data } = await api.get(`/trips/${id}`);
  return data;
};

export const createTrip = async (tripData) => {
  const { data } = await api.post('/trips', tripData);
  return data;
};

export const updateTrip = async (id, tripData) => {
  const { data } = await api.put(`/trips/${id}`, tripData);
  return data;
};

export const deleteTrip = async (id) => {
  const { data } = await api.delete(`/trips/${id}`);
  return data;
};

export const getFeaturedTrips = async () => {
  try {
    const { data } = await api.get('/trips/community');
    return data;
  } catch (err) {
    await delay(300);
    return MOCK_FEATURED_TRIPS.map(t => ({
      id: t.id,
      name: t.name,
      cover_photo: t.image,
      place: "the world" // fallback place text
    }));
  }
};
