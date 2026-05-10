import api from './axios';
import { MOCK_DESTINATIONS, delay } from '../mock/data';

export const searchCities = async (q = '') => {
  try {
    const { data } = await api.get(`/cities?q=${q}`);
    return data;
  } catch (err) {
    return [];
  }
};

export const getFeaturedCities = async () => {
  try {
    const { data } = await api.get('/cities?featured=true');
    return data;
  } catch (err) {
    await delay(300);
    return MOCK_DESTINATIONS.map(d => ({
      id: d.id,
      name: d.name.split(',')[0],
      country: d.name.split(', ')[1] || '',
      image_url: d.image,
      popularity: d.trending ? 5 : 4
    }));
  }
};

export const getActivities = async () => {
  try {
    const { data } = await api.get('/cities/activities');
    return data;
  } catch (err) {
    return [];
  }
};
