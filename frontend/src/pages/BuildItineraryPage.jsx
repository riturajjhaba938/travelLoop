import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import useTripStore from '../store/useTripStore';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

export default function BuildItineraryPage() {
  const { id } = useParams();
  const { currentTrip: trip, fetchTrip, loading, error, updateTrip } = useTripStore();
  const [days, setDays] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchTrip(id); }, [fetchTrip, id]);
  useEffect(() => { if (trip) setDays(JSON.parse(JSON.stringify(trip.days || []))); }, [trip]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!trip) return <ErrorMessage message="Trip not found" />;

  const handleAddDay = () => {
    setDays([...days, {
      id: 'day-' + Date.now(),
      dayNumber: days.length + 1,
      title: 'New Day',
      date: new Date(new Date(trip.startDate).getTime() + days.length * 86400000).toISOString().split('T')[0],
      activities: []
    }]);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateTrip(id, { days });
      toast.success('Itinerary saved!');
    } catch {
      toast.error('Failed to save itinerary');
    } finally {
      setSaving(false);
    }
  };

  const inputBase = {
    padding: '10px 14px', borderRadius: 'var(--r-md)',
    border: '1.5px solid var(--border)', outline: 'none',
    fontSize: 14, fontFamily: 'var(--font-sans)',
    background: '#fff', color: 'var(--text-main)',
    width: '100%', transition: 'border-color 0.2s',
  };

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
        <div>
          <Link to={`/trips/${trip.id}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 14, fontWeight: 600, marginBottom: 14, fontFamily: 'var(--font-sans)' }}>
            <ArrowLeft size={15} /> Back to Trip Overview
          </Link>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 400, color: 'var(--text-main)', lineHeight: 1.15 }}>
            Build Itinerary: <em>{trip.name}</em>
          </h1>
        </div>
        <motion.button
          onClick={handleSave} disabled={saving}
          whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--primary)', color: '#fff',
            padding: '12px 28px', borderRadius: 'var(--r-full)',
            fontSize: 14, fontWeight: 600, border: 'none',
            cursor: 'pointer', opacity: saving ? 0.7 : 1,
            fontFamily: 'var(--font-sans)',
            boxShadow: 'var(--shadow-md)',
          }}
          onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--glow-primary)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
        >
          <Save size={16} /> {saving ? 'Saving…' : 'Save Changes'}
        </motion.button>
      </header>

      {/* Timeline with gradient connector */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {days.map((day, dIdx) => (
          <div key={day.id} style={{ display: 'flex', gap: 24 }}>
            {/* Timeline rail */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 40, flexShrink: 0 }}>
              {/* Dot */}
              <div style={{
                width: 16, height: 16, borderRadius: '50%', flexShrink: 0, marginTop: 36,
                background: `linear-gradient(135deg, var(--primary), var(--secondary))`,
                boxShadow: '0 0 0 3px rgba(255,90,95,0.2)',
              }} />
              {/* Connector line */}
              {dIdx < days.length - 1 && (
                <div style={{
                  flex: 1, width: 2, marginTop: 4,
                  background: 'linear-gradient(to bottom, var(--primary) 0%, var(--secondary) 100%)',
                  opacity: 0.35,
                  minHeight: 48,
                }} />
              )}
            </div>

            {/* Day card */}
            <motion.div
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: dIdx * 0.06, duration: 0.4 }}
              style={{
                flex: 1, background: '#fff', borderRadius: 'var(--r-xl)',
                border: '1px solid var(--border)', padding: '28px 32px',
                boxShadow: 'var(--shadow-sm)', marginBottom: 24,
              }}
            >
              {/* Day header */}
              <div style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 8, fontFamily: 'var(--font-sans)' }}>
                    Day {dIdx + 1} — Title
                  </label>
                  <input type="text" value={day.title}
                    onChange={e => { const nd = [...days]; nd[dIdx].title = e.target.value; setDays(nd); }}
                    onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    style={inputBase} />
                </div>
                <div style={{ width: 200 }}>
                  <label style={{ display: 'block', fontSize: 11, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: 8, fontFamily: 'var(--font-sans)' }}>Date</label>
                  <input type="date" value={day.date}
                    onChange={e => { const nd = [...days]; nd[dIdx].date = e.target.value; setDays(nd); }}
                    onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    style={inputBase} />
                </div>
              </div>

              {/* Activities */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                <h4 style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: 1.5 }}>
                  Activities
                </h4>
                {day.activities.map((act, aIdx) => (
                  <motion.div
                    key={act.id}
                    whileHover={{ scale: 1.015, boxShadow: 'var(--shadow-xl)' }}
                    transition={{ duration: 0.18 }}
                    style={{
                      display: 'flex', gap: 12, alignItems: 'flex-start',
                      background: 'var(--surface)', padding: '14px 16px',
                      borderRadius: 'var(--r-lg)', border: '1.5px solid var(--border)',
                    }}
                  >
                    <div style={{ width: 96 }}>
                      <input type="text" placeholder="10:00 AM" value={act.time}
                        onChange={e => { const nd = [...days]; nd[dIdx].activities[aIdx].time = e.target.value; setDays(nd); }}
                        onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                        style={{ ...inputBase, background: '#fff', fontSize: 13 }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <input type="text" placeholder="Activity title" value={act.title}
                        onChange={e => { const nd = [...days]; nd[dIdx].activities[aIdx].title = e.target.value; setDays(nd); }}
                        onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                        style={{ ...inputBase, background: '#fff', fontSize: 13, marginBottom: 8 }} />
                      <input type="text" placeholder="Description (optional)" value={act.description}
                        onChange={e => { const nd = [...days]; nd[dIdx].activities[aIdx].description = e.target.value; setDays(nd); }}
                        onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                        style={{ ...inputBase, background: '#fff', fontSize: 13 }} />
                    </div>
                    <div style={{ width: 84 }}>
                      <input type="number" placeholder="Cost" value={act.cost}
                        onChange={e => { const nd = [...days]; nd[dIdx].activities[aIdx].cost = Number(e.target.value); setDays(nd); }}
                        onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                        onBlur={e => e.target.style.borderColor = 'var(--border)'}
                        style={{ ...inputBase, background: '#fff', fontSize: 13 }} />
                    </div>
                    <button onClick={() => { const nd = [...days]; nd[dIdx].activities.splice(aIdx, 1); setDays(nd); }}
                      style={{ background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, paddingTop: 10 }}>
                      Remove
                    </button>
                  </motion.div>
                ))}

                <button
                  onClick={() => { const nd = [...days]; nd[dIdx].activities.push({ id: 'act-' + Date.now(), time: '09:00 AM', title: '', description: '', duration: '1 hr', type: 'sightseeing', cost: 0, status: 'upcoming', icon: '📍' }); setDays(nd); }}
                  style={{
                    alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 6,
                    background: 'none', border: '1.5px dashed var(--border)',
                    color: 'var(--primary)', padding: '9px 16px', borderRadius: 'var(--r-md)',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)',
                    transition: 'border-color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <Plus size={14} /> Add Activity
                </button>
              </div>
            </motion.div>
          </div>
        ))}

        <button
          onClick={handleAddDay}
          style={{
            marginLeft: 64, width: 'calc(100% - 64px)',
            padding: 24, border: '2px dashed var(--border)', borderRadius: 'var(--r-xl)',
            background: 'transparent', color: 'var(--text-secondary)',
            fontSize: 15, fontWeight: 600, cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontFamily: 'var(--font-sans)', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.background = 'rgba(255,90,95,0.04)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent'; }}
        >
          <Plus size={20} /> Add New Day
        </button>
      </div>
    </div>
  );
}
