import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Plus, ArrowLeft, Calendar, Edit3, Trash2 } from 'lucide-react';
import { getNotes, createNote, deleteNote } from '../api/notes.api';
import Loader from '../components/common/Loader';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id: tripId } = useParams();
  const [isAdding, setIsAdding] = useState(false);
  const [newDayNumber, setNewDayNumber] = useState('1');
  const [newContent, setNewContent] = useState('');

  useEffect(() => {
    getNotes(tripId).then(res => { setNotes(res); setLoading(false); });
  }, []);

  const handleSave = async () => {
    if (!newContent.trim()) return;
    const note = await createNote(tripId, { day_number: Number(newDayNumber) || 1, content: newContent });
    setNotes([note, ...notes]);
    setIsAdding(false); setNewDayNumber('1'); setNewContent('');
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter(n => n.id !== id));
  };

  if (loading) return <Loader />;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40 }}>
        <div>
          <Link to={`/trips/${tripId}`} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: 600, marginBottom: 16 }}>
            <ArrowLeft size={16} /> Back to Trip Overview
          </Link>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 32, fontWeight: 700, color: 'var(--text-main)' }}>
            Travel Notes
          </h1>
        </div>
        <button onClick={() => setIsAdding(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--primary-btn)', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: 'var(--r-full)', fontWeight: 600, cursor: 'pointer' }}>
          <Plus size={18} /> New Note
        </button>
      </header>
      {isAdding && (
        <div style={{ background: '#fff', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', padding: 24, marginBottom: 32, boxShadow: 'var(--shadow-md)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-main)' }}>Day</span>
            <input type="number" min="1" value={newDayNumber} onChange={e => setNewDayNumber(e.target.value)} style={{ width: 60, padding: '6px 12px', border: '1px solid var(--border)', borderRadius: 'var(--r-md)', fontSize: 15, outline: 'none' }} />
          </div>
          <textarea placeholder="Write your notes here..." value={newContent} onChange={e => setNewContent(e.target.value)} style={{ width: '100%', border: 'none', fontSize: 15, lineHeight: 1.6, minHeight: 150, outline: 'none', resize: 'vertical', marginBottom: 16 }} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
            <button onClick={() => setIsAdding(false)} style={{ padding: '8px 16px', border: 'none', background: 'transparent', color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
            <button onClick={handleSave} style={{ padding: '8px 16px', border: 'none', background: 'var(--primary)', color: '#fff', borderRadius: 'var(--r-md)', fontWeight: 600, cursor: 'pointer' }}>Save Note</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {notes.map(note => (
          <div key={note.id} style={{ background: '#fff', borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', padding: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-main)' }}>Day {note.day_number}</h3>
              <div style={{ display: 'flex', gap: 8 }}>
                <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: 4 }}><Edit3 size={16} /></button>
                <button onClick={() => handleDelete(note.id)} style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', padding: 4 }}><Trash2 size={16} /></button>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)', fontSize: 12, marginBottom: 16 }}>
              <Calendar size={12} /> {new Date(note.updated_at || note.updatedAt || note.created_at || note.createdAt).toLocaleDateString()} at {new Date(note.updated_at || note.updatedAt || note.created_at || note.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>
              {note.content}
            </p>
          </div>
        ))}
        {notes.length === 0 && !isAdding && (
          <div style={{ textAlign: 'center', padding: '64px 0', color: 'var(--text-secondary)' }}>
            No notes yet. Click 'New Note' to start writing.
          </div>
        )}
      </div>
    </div>
  );
}
