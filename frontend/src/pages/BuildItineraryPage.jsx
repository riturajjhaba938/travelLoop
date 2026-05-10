import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Trash2, Edit3, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useTripStore from '../store/useTripStore';
import { getSections, createSection, updateSection, deleteSection } from '../api/sections.api';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const sortSections = (list) => {
  return [...list].sort((a, b) => {
    const orderA = Number.isFinite(Number(a.order_index)) ? Number(a.order_index) : Number.MAX_SAFE_INTEGER;
    const orderB = Number.isFinite(Number(b.order_index)) ? Number(b.order_index) : Number.MAX_SAFE_INTEGER;
    if (orderA !== orderB) return orderA - orderB;
    return new Date(a.date_from) - new Date(b.date_from);
  });
};

export default function BuildItineraryPage() {
  const { id } = useParams();
  const { currentTrip: trip, fetchTrip, loading: tripLoading, error } = useTripStore();
  
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // New section form state
  const [isAdding, setIsAdding] = useState(false);
  const [newSection, setNewSection] = useState({
    title: '', description: '', date_from: '', date_to: '',
    budget: 0, section_type: 'activity'
  });

  // Edit section state
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  useEffect(() => { fetchTrip(id); }, [fetchTrip, id]);

  useEffect(() => {
    if (trip) {
      getSections(id)
        .then(res => setSections(sortSections(res)))
        .catch(err => toast.error('Failed to load itinerary sections'))
        .finally(() => setLoading(false));
    }
  }, [trip, id]);

  if (tripLoading || loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!trip) return <ErrorMessage message="Trip not found" />;

  const handleAddSection = async () => {
    if (!newSection.title || !newSection.date_from) {
      toast.error('Title and Date are required');
      return;
    }
    setSaving(true);
    try {
      const added = await createSection(id, {
        ...newSection,
        order_index: sections.length,
      });
      setSections(prev => sortSections([...prev, added]));
      setIsAdding(false);
      setNewSection({ title: '', description: '', date_from: '', date_to: '', budget: 0, section_type: 'activity' });
      toast.success('Section added');
    } catch {
      toast.error('Failed to add section');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateSection = async (sectionId) => {
    setSaving(true);
    try {
      const sectionToUpdate = sections.find(s => s.id === sectionId);
      const updated = await updateSection(sectionId, {
        ...editForm,
        order_index: editForm.order_index ?? sectionToUpdate?.order_index ?? 0,
      });
      setSections(prev => sortSections(prev.map(s => s.id === sectionId ? updated : s)));
      setEditingId(null);
      toast.success('Section updated');
    } catch {
      toast.error('Failed to update section');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    if (!window.confirm('Delete this section?')) return;
    try {
      await deleteSection(sectionId);
      setSections(prev => sortSections(prev.filter(s => s.id !== sectionId)));
      toast.success('Section deleted');
    } catch {
      toast.error('Failed to delete section');
    }
  };

  const inputBase = {
    padding: '10px 14px', borderRadius: 'var(--r-md)',
    border: '1.5px solid var(--border)', outline: 'none',
    fontSize: 14, fontFamily: 'var(--font-sans)',
    background: '#fff', color: 'var(--text-main)',
    width: '100%', transition: 'border-color 0.2s',
  };

  const sortedSections = sortSections(sections);

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
        <div>
          <Link to={`/trips/${trip.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 14, fontWeight: 600, marginBottom: 14, fontFamily: 'var(--font-sans)', textDecoration: 'none' }}>
            <ArrowLeft size={15} /> Back to Trip Overview
          </Link>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 400, color: 'var(--text-main)', lineHeight: 1.15 }}>
            Build Itinerary: <em>{trip.name}</em>
          </h1>
        </div>
      </header>

      {/* Timeline */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {sortedSections.map((section, idx) => (
          <div key={section.id} style={{ display: 'flex', gap: 24 }}>
            {/* Timeline rail */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 40, flexShrink: 0 }}>
              <div style={{
                width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 36,
                background: `linear-gradient(135deg, var(--primary), var(--secondary))`,
                boxShadow: '0 0 0 3px rgba(255,90,95,0.2)',
              }} />
              {idx < sortedSections.length - 1 && (
                <div style={{
                  flex: 1, width: 2, marginTop: 4,
                  background: 'linear-gradient(to bottom, var(--primary) 0%, var(--secondary) 100%)',
                  opacity: 0.35, minHeight: 48,
                }} />
              )}
            </div>

            {/* Section card */}
            <motion.div
              initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}
              style={{
                flex: 1, background: '#fff', borderRadius: 'var(--r-xl)',
                border: '1px solid var(--border)', padding: '28px 32px',
                boxShadow: 'var(--shadow-sm)', marginBottom: 24,
              }}
            >
              {editingId === section.id ? (
                /* EDIT MODE */
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase' }}>Title</label>
                      <input type="text" value={editForm.title || ''} onChange={e => setEditForm({...editForm, title: e.target.value})} style={inputBase} />
                    </div>
                    <div style={{ width: 150 }}>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase' }}>Type</label>
                      <select value={editForm.section_type || ''} onChange={e => setEditForm({...editForm, section_type: e.target.value})} style={inputBase}>
                        <option value="activity">Activity</option>
                        <option value="hotel">Hotel</option>
                        <option value="transport">Transport</option>
                        <option value="food">Food</option>
                      </select>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase' }}>Start Date</label>
                      <input type="datetime-local" value={editForm.date_from ? new Date(editForm.date_from).toISOString().slice(0, 16) : ''} onChange={e => setEditForm({...editForm, date_from: e.target.value})} style={inputBase} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase' }}>End Date (Optional)</label>
                      <input type="datetime-local" value={editForm.date_to ? new Date(editForm.date_to).toISOString().slice(0, 16) : ''} onChange={e => setEditForm({...editForm, date_to: e.target.value})} style={inputBase} />
                    </div>
                    <div style={{ width: 150 }}>
                      <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase' }}>Budget</label>
                      <input type="number" value={editForm.budget || 0} onChange={e => setEditForm({...editForm, budget: Number(e.target.value)})} style={inputBase} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase' }}>Description</label>
                    <textarea value={editForm.description || ''} onChange={e => setEditForm({...editForm, description: e.target.value})} style={{ ...inputBase, minHeight: 80, resize: 'vertical' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                    <button onClick={() => setEditingId(null)} style={{ padding: '8px 16px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, color: 'var(--text-secondary)' }}>Cancel</button>
                    <button onClick={() => handleUpdateSection(section.id)} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 'var(--r-md)', cursor: 'pointer', fontWeight: 600 }}>
                      <Check size={16} /> Save
                    </button>
                  </div>
                </div>
              ) : (
                /* VIEW MODE */
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, color: 'var(--primary)', background: 'rgba(255,90,95,0.1)', padding: '4px 10px', borderRadius: 'var(--r-full)' }}>
                          {section.section_type}
                        </span>
                        <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>
                          {new Date(section.date_from).toLocaleString()} 
                          {section.date_to && ` — ${new Date(section.date_to).toLocaleString()}`}
                        </span>
                      </div>
                      <h3 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-main)', marginBottom: 8 }}>{section.title}</h3>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => { setEditingId(section.id); setEditForm(section); }} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}><Edit3 size={18} /></button>
                      <button onClick={() => handleDeleteSection(section.id)} style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', padding: 4 }}><Trash2 size={18} /></button>
                    </div>
                  </div>
                  {section.description && <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap', marginBottom: 16 }}>{section.description}</p>}
                  {section.budget > 0 && <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>Budget: ${section.budget}</div>}
                </div>
              )}
            </motion.div>
          </div>
        ))}

        {isAdding ? (
          <div style={{ marginLeft: 64, background: '#fff', borderRadius: 'var(--r-xl)', border: '1px solid var(--border)', padding: '28px 32px', boxShadow: 'var(--shadow-md)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-main)', marginBottom: 20 }}>Add New Section</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase' }}>Title</label>
                  <input type="text" value={newSection.title} onChange={e => setNewSection({...newSection, title: e.target.value})} style={inputBase} />
                </div>
                <div style={{ width: 150 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase' }}>Type</label>
                  <select value={newSection.section_type} onChange={e => setNewSection({...newSection, section_type: e.target.value})} style={inputBase}>
                    <option value="activity">Activity</option>
                    <option value="hotel">Hotel</option>
                    <option value="transport">Transport</option>
                    <option value="food">Food</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase' }}>Start Date</label>
                  <input type="datetime-local" value={newSection.date_from} onChange={e => setNewSection({...newSection, date_from: e.target.value})} style={inputBase} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase' }}>End Date (Optional)</label>
                  <input type="datetime-local" value={newSection.date_to} onChange={e => setNewSection({...newSection, date_to: e.target.value})} style={inputBase} />
                </div>
                <div style={{ width: 150 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase' }}>Budget</label>
                  <input type="number" value={newSection.budget} onChange={e => setNewSection({...newSection, budget: Number(e.target.value)})} style={inputBase} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 8, textTransform: 'uppercase' }}>Description</label>
                <textarea value={newSection.description} onChange={e => setNewSection({...newSection, description: e.target.value})} style={{ ...inputBase, minHeight: 80, resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <button onClick={() => setIsAdding(false)} style={{ padding: '8px 16px', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, color: 'var(--text-secondary)' }}>Cancel</button>
                <button onClick={handleAddSection} disabled={saving} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', background: 'var(--primary)', color: '#fff', border: 'none', borderRadius: 'var(--r-md)', cursor: 'pointer', fontWeight: 600 }}>
                  <Plus size={16} /> Add Section
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button onClick={() => setIsAdding(true)} style={{ marginLeft: 64, padding: 24, border: '2px dashed var(--border)', borderRadius: 'var(--r-xl)', background: 'transparent', color: 'var(--text-secondary)', fontSize: 15, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'var(--font-sans)', transition: 'all 0.2s', width: 'calc(100% - 64px)' }}>
            <Plus size={20} /> Add New Section
          </button>
        )}
      </div>
    </div>
  );
}
