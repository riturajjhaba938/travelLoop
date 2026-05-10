import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Users, Sun, Navigation, ArrowLeft, Plus } from 'lucide-react';
import useTripStore from '../store/useTripStore';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

export default function ItineraryViewPage() {
  const { id } = useParams();
  const { currentTrip: trip, fetchTrip, loading, error } = useTripStore();
  const [activeDay, setActiveDay] = useState(0);

  useEffect(() => {
    fetchTrip(id);
  }, [fetchTrip, id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!trip) return <ErrorMessage message="Trip not found" />;

  const days = trip.days || [];
  const currentDay = days[activeDay];

  return (
    <div>
      <div style={{ height: 320, position: 'relative' }}>
        <img src={trip.coverImage} alt={trip.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2))' }} />
        <div style={{ position: 'absolute', top: 24, left: 48 }}>
          <Link to="/trips" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
            <ArrowLeft size={16} /> Back to Trips
          </Link>
        </div>
        <div style={{ position: 'absolute', bottom: 48, left: 48, right: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ color: '#fff' }}>
            <div style={{ display: 'inline-block', background: 'var(--primary)', color: '#fff', padding: '4px 12px', borderRadius: 'var(--r-full)', fontSize: 12, fontWeight: 600, textTransform: 'uppercase', marginBottom: 12 }}>
              {trip.status}
            </div>
            <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 40, fontWeight: 700, marginBottom: 8 }}>{trip.name}</h1>
            <div style={{ display: 'flex', gap: 24, fontSize: 15, opacity: 0.9 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={16} /> {trip.destination}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={16} /> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
            </div>
          </div>
          <Link to={`/trips/${trip.id}/build`} style={{ background: '#fff', color: 'var(--text-main)', padding: '12px 24px', borderRadius: 'var(--r-full)', fontWeight: 600, fontSize: 14, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Navigation size={16} /> Edit Itinerary
          </Link>
        </div>
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px', display: 'flex', gap: 48 }}>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 24, fontWeight: 700, color: 'var(--text-main)', marginBottom: 24 }}>Itinerary</h2>
          
          {days.length === 0 ? (
            <div style={{ background: 'var(--surface)', padding: 48, borderRadius: 'var(--r-lg)', textAlign: 'center', border: '1px dashed var(--border)' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>No days planned yet.</p>
              <Link to={`/trips/${trip.id}/build`} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Start building your itinerary</Link>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 16, marginBottom: 24 }}>
                {days.map((day, idx) => (
                  <button
                    key={day.id} onClick={() => setActiveDay(idx)}
                    style={{
                      flexShrink: 0, padding: '12px 20px', borderRadius: 'var(--r-md)',
                      background: activeDay === idx ? 'var(--primary)' : 'var(--surface)',
                      color: activeDay === idx ? '#fff' : 'var(--text-main)',
                      border: activeDay === idx ? 'none' : '1px solid var(--border)',
                      fontWeight: 600, cursor: 'pointer', textAlign: 'left', minWidth: 140
                    }}
                  >
                    <div style={{ fontSize: 13, opacity: activeDay === idx ? 0.8 : 0.6, marginBottom: 4 }}>Day {day.dayNumber}</div>
                    <div style={{ fontSize: 14 }}>{new Date(day.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                  </button>
                ))}
              </div>

              {currentDay && (
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-main)', marginBottom: 24 }}>{currentDay.title}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 24, top: 24, bottom: 24, width: 2, background: 'var(--border)' }} />
                    
                    {currentDay.activities.map((act) => (
                      <div key={act.id} style={{ display: 'flex', gap: 24, position: 'relative', zIndex: 1 }}>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--surface)', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0, backgroundColor: '#fff' }}>
                          {act.icon}
                        </div>
                        <div style={{ flex: 1, background: '#fff', padding: 20, borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)' }}>{act.time} • {act.duration}</div>
                            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{trip.currency}{act.cost}</div>
                          </div>
                          <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-main)', marginBottom: 4 }}>{act.title}</h4>
                          <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{act.description}</p>
                        </div>
                      </div>
                    ))}
                    {currentDay.activities.length === 0 && (
                      <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                        No activities scheduled for this day.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {trip.weather && (
            <div style={{ background: '#fff', padding: 24, borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-main)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sun size={18} /> Expected Weather
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
                <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--text-main)' }}>{trip.weather.high}°</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)' }}>{trip.weather.condition}</div>
                  Low: {trip.weather.low}°
                </div>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{trip.weather.note}</p>
            </div>
          )}

          <div style={{ background: '#fff', padding: 24, borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-main)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <DollarSign size={18} /> Budget Overview
            </h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14 }}>
              <span style={{ color: 'var(--text-secondary)' }}>Total Planned</span>
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{trip.currency}{trip.budget_breakdown?.total || 0} / {trip.currency}{trip.budget_breakdown?.limit || trip.budget}</span>
            </div>
            <div style={{ height: 8, background: 'var(--surface-high)', borderRadius: 4, overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ height: '100%', width: `${Math.min(100, ((trip.budget_breakdown?.total || 0) / (trip.budget_breakdown?.limit || trip.budget || 1)) * 100)}%`, background: 'var(--primary)', borderRadius: 4 }} />
            </div>
            <Link to="/budget" style={{ fontSize: 14, color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>View detailed breakdown &rarr;</Link>
          </div>

          <div style={{ background: '#fff', padding: 24, borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-main)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users size={18} /> Trip Tools
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to="/checklist" style={{ padding: '12px 16px', background: 'var(--surface)', borderRadius: 'var(--r-md)', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 500, fontSize: 14, display: 'flex', justifyContent: 'space-between' }}>
                Packing Checklist <ArrowLeft size={16} style={{ transform: 'rotate(180deg)', color: 'var(--text-muted)' }} />
              </Link>
              <Link to="/notes" style={{ padding: '12px 16px', background: 'var(--surface)', borderRadius: 'var(--r-md)', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 500, fontSize: 14, display: 'flex', justifyContent: 'space-between' }}>
                Travel Notes <ArrowLeft size={16} style={{ transform: 'rotate(180deg)', color: 'var(--text-muted)' }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
