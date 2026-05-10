import { MOCK_CITIES, MOCK_SEARCH_RESULTS, delay } from '../mock/data';
export const searchCities = async (q) => { await delay(250); return MOCK_CITIES.filter(c=>c.toLowerCase().includes(q.toLowerCase())); };
export const getActivities = async () => { await delay(); return MOCK_SEARCH_RESULTS; };
