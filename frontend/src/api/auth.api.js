import { MOCK_USER, delay } from '../mock/data';

export const login = async ({ email, password }) => {
  await delay();
  if (email === MOCK_USER.email && password === MOCK_USER.password) {
    return { user: MOCK_USER, token: 'tl-mock-token-' + Date.now() };
  }
  throw new Error('Invalid email or password. Try elena@example.com / password123');
};

export const register = async (data) => {
  await delay(900);
  const newUser = { ...MOCK_USER, ...data, id: 'user-' + Date.now() };
  return { user: newUser, token: 'tl-mock-token-new' };
};

export const getMe = async () => { await delay(300); return MOCK_USER; };
