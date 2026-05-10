import { MOCK_TRIPS, delay } from '../mock/data';
export const getSections = async (tripId) => { await delay(); return MOCK_TRIPS.find(t=>t.id===tripId)?.days ?? []; };
export const createSection = async (tripId, data) => { await delay(); return { id:'day-'+Date.now(), activities:[], ...data }; };
export const updateSection = async (tripId, sectionId, data) => { await delay(); return { id:sectionId, ...data }; };
export const deleteSection = async () => { await delay(); return { success:true }; };
