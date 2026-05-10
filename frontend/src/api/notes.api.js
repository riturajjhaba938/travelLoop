import { MOCK_NOTES, delay } from '../mock/data';
let _notes = [...MOCK_NOTES];
export const getNotes = async (tripId) => { await delay(); return _notes.filter(n=>n.tripId===tripId); };
export const createNote = async (tripId, data) => { await delay(); const n={id:'note-'+Date.now(),tripId,updatedAt:new Date().toISOString(),...data}; _notes=[..._notes,n]; return n; };
export const updateNote = async (tripId, noteId, data) => { await delay(); _notes=_notes.map(n=>n.id===noteId?{...n,...data,updatedAt:new Date().toISOString()}:n); return _notes.find(n=>n.id===noteId); };
export const deleteNote = async (tripId, noteId) => { await delay(); _notes=_notes.filter(n=>n.id!==noteId); };
