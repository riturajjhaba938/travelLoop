import api from './axios';
import { MOCK_USER, delay } from '../mock/data';

export const login = async (credentials) => {
  try {
    const { data } = await api.post('/auth/login', credentials);
    return data;
  } catch (err) {
    await delay(600);
    if (credentials.email === MOCK_USER.email && credentials.password === MOCK_USER.password) {
      return { user: MOCK_USER, token: 'mock-jwt-token-123' };
    }
    // For demo purposes, allow any login if backend is down
    return { user: { ...MOCK_USER, email: credentials.email || MOCK_USER.email }, token: 'mock-jwt-token-123' };
  }
};

export const register = async (userData) => {
  try {
    const { data } = await api.post('/auth/register', userData);
    return data;
  } catch (err) {
    await delay(600);
    return { user: { ...MOCK_USER, ...userData, id: 'user-new' }, token: 'mock-jwt-token-new' };
  }
};

export const getMe = async () => {
  try {
    const { data } = await api.get('/auth/me');
    return data;
  } catch (err) {
    await delay(300);
    return { user: MOCK_USER };
  }
};
