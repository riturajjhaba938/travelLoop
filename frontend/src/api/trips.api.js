import { MOCK_TRIPS, delay } from '../mock/data';
let _trips = [...MOCK_TRIPS];

export const getTrips = async () => { await delay(); return [..._trips]; };
export const getTripById = async (id) => { await delay(300); return _trips.find(t => t.id === id) ?? null; };
export const createTrip = async (data) => {
  await delay(800);
  const t = { id: 'trip-' + Date.now(), status: 'planning', travelers: 1, days: [], budget_breakdown: { dining:0,activities:0,total:0,limit:0 }, weather: null, coverImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', ...data };
  _trips = [t, ..._trips]; return t;
};
export const updateTrip = async (id, data) => { await delay(); _trips = _trips.map(t => t.id===id?{...t,...data}:t); return _trips.find(t=>t.id===id); };
export const deleteTrip = async (id) => { await delay(); _trips = _trips.filter(t=>t.id!==id); };
