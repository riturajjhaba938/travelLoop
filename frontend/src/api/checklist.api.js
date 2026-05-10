import { MOCK_CHECKLIST, delay } from '../mock/data';
let _items = [...MOCK_CHECKLIST];
export const getChecklist = async (tripId) => { await delay(); return _items.filter(i=>i.tripId===tripId); };
export const addChecklistItem = async (tripId, data) => { await delay(); const n={id:'chk-'+Date.now(),tripId,checked:false,...data}; _items=[..._items,n]; return n; };
export const toggleChecklistItem = async (tripId, itemId) => { await delay(150); _items=_items.map(i=>i.id===itemId?{...i,checked:!i.checked}:i); return _items.find(i=>i.id===itemId); };
export const deleteChecklistItem = async (tripId, itemId) => { await delay(150); _items=_items.filter(i=>i.id!==itemId); };
