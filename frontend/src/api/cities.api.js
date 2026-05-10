import api from './axios';

export const searchCities = async (q = '') => {
  const { data } = await api.get(`/cities?q=${q}`);
  return data;
};

export const getFeaturedCities = async () => {
  const { data } = await api.get('/cities?featured=true');
  return data;
};

export const getActivities = async () => {
  const { data } = await api.get('/cities/activities');
  return data;
};
