import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, Check, Search, ArrowLeft } from 'lucide-react';
import { getChecklist, toggleChecklistItem, addChecklistItem } from '../api/checklist.api';
import Loader from '../components/common/Loader';

export default function ChecklistPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newItem, setNewItem] = useState('');
  const { id: tripId } = useParams();

  useEffect(() => {
    getChecklist(tripId).then(res => { setItems(res); setLoading(false); });
  }, [tripId]);

  const handleToggle = async (id) => {
    const itemToToggle = items.find(i => i.id === id);
    if (!itemToToggle) return;
    
    setItems(items.map(i => i.id === id ? { ...i, is_checked: !i.is_checked } : i));
    await toggleChecklistItem(id, !itemToToggle.is_checked);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newItem.trim()) return;
    const item = await addChecklistItem(tripId, { item_name: newItem, category: 'General' });
    setItems([...items, item]);
    setNewItem('');
  };

  if (loading) return <Loader />;

  const categories = [...new Set(items.map(i => i.category))];
  const completionPercent = items.length ? (items.filter(i => i.is_checked).length / items.length) * 100 : 0;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
      <header style={{ marginBottom: 40 }}>
        <Link to={`/trips/${tripId}`} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
          <ArrowLeft size={16} /> Back to Trip Overview
        </Link>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 32, fontWeight: 700, color: 'var(--text-main)', marginBottom: 8 }}>
          Packing & Prep Checklist
        </h1>
        <div style={{ width: '100%', height: 8, background: 'var(--surface)', borderRadius: 4, overflow: 'hidden', marginTop: 24 }}>
          <div style={{ height: '100%', width: `${completionPercent}%`, background: 'var(--primary)', transition: 'width 0.3s' }} />
        </div>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 8 }}>
          {items.filter(i => i.is_checked).length} of {items.length} completed
        </div>
      </header>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
        <input
          type="text" placeholder="Add new item..." value={newItem} onChange={e => setNewItem(e.target.value)}
          style={{ flex: 1, padding: '12px 16px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', outline: 'none', fontSize: 15 }}
        />
        <button type="submit" style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '0 24px', borderRadius: 'var(--r-md)', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Plus size={18} /> Add
        </button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        {categories.map(cat => (
          <div key={cat}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)', marginBottom: 16, borderBottom: '1px solid var(--border)', paddingBottom: 8 }}>{cat}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {items.filter(i => i.category === cat).map(item => (
                <label key={item.id} onClick={() => handleToggle(item.id)} style={{ display: 'flex', alignItems: 'center', gap: 16, cursor: 'pointer', padding: '8px 0' }}>
                  <div style={{ width: 24, height: 24, borderRadius: 6, border: `2px solid ${item.is_checked ? 'var(--primary)' : 'var(--border)'}`, background: item.is_checked ? 'var(--primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                    {item.is_checked && <Check size={14} color="#fff" />}
                  </div>
                  <span style={{ fontSize: 15, color: item.is_checked ? 'var(--text-muted)' : 'var(--text-main)', textDecoration: item.is_checked ? 'line-through' : 'none', transition: 'all 0.2s' }}>
                    {item.item_name}
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
