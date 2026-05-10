import { create } from 'zustand';
import * as api from '../api/trips.api';

const useTripStore = create((set, get) => ({
  trips: [], currentTrip: null, loading: false, error: null,

  fetchTrips: async () => {
    set({ loading: true });
    try { set({ trips: await api.getTrips(), loading: false }); }
    catch (e) { set({ error: e.message, loading: false }); }
  },

  fetchTrip: async (id) => {
    set({ loading: true });
    try { set({ currentTrip: await api.getTripById(id), loading: false }); }
    catch (e) { set({ error: e.message, loading: false }); }
  },

  createTrip: async (data) => {
    const trip = await api.createTrip(data);
    set(s => ({ trips: [trip, ...s.trips] }));
    return trip;
  },

  updateTrip: async (id, data) => {
    const updated = await api.updateTrip(id, data);
    set(s => ({ trips: s.trips.map(t => t.id===id ? updated : t), currentTrip: updated }));
    return updated;
  },

  deleteTrip: async (id) => {
    await api.deleteTrip(id);
    set(s => ({ trips: s.trips.filter(t => t.id!==id) }));
  },
}));

export default useTripStore;
