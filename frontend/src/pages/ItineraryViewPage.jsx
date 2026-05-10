import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Users, Sun, Navigation, ArrowLeft, Hotel, Car, Utensils, Activity } from 'lucide-react';
import useTripStore from '../store/useTripStore';
import { getSections } from '../api/sections.api';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const TYPE_ICONS = {
  hotel: <Hotel size={20} color="var(--primary)" />,
  transport: <Car size={20} color="var(--primary)" />,
  food: <Utensils size={20} color="var(--primary)" />,
  activity: <Activity size={20} color="var(--primary)" />
};

export default function ItineraryViewPage() {
  const { id } = useParams();
  const { currentTrip: trip, fetchTrip, loading: tripLoading, error } = useTripStore();
  const [sections, setSections] = useState([]);
  const [sectionsLoading, setSectionsLoading] = useState(true);
  const [activeDayIdx, setActiveDayIdx] = useState(0);

  useEffect(() => {
    fetchTrip(id);
    getSections(id)
      .then(res => setSections(res))
      .catch(console.error)
      .finally(() => setSectionsLoading(false));
  }, [fetchTrip, id]);

  const groupedDays = useMemo(() => {
    const sortedSections = [...sections].sort((a, b) => {
      const orderA = Number.isFinite(Number(a.order_index)) ? Number(a.order_index) : Number.MAX_SAFE_INTEGER;
      const orderB = Number.isFinite(Number(b.order_index)) ? Number(b.order_index) : Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(a.date_from) - new Date(b.date_from);
    });

    const groups = {};
    sortedSections.forEach(sec => {
      // Group by local date string
      const dateStr = new Date(sec.date_from).toLocaleDateString();
      if (!groups[dateStr]) {
        groups[dateStr] = { date: sec.date_from, sections: [] };
      }
      groups[dateStr].sections.push(sec);
    });
    const sorted = Object.values(groups).sort((a, b) => new Date(a.date) - new Date(b.date));
    sorted.forEach(day => day.sections.sort((a, b) => {
      const orderA = Number.isFinite(Number(a.order_index)) ? Number(a.order_index) : Number.MAX_SAFE_INTEGER;
      const orderB = Number.isFinite(Number(b.order_index)) ? Number(b.order_index) : Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return new Date(a.date_from) - new Date(b.date_from);
    }));
    return sorted;
  }, [sections]);

  if (tripLoading || sectionsLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!trip) return <ErrorMessage message="Trip not found" />;

  const currentDay = groupedDays[activeDayIdx];

  return (
    <div>
      <div style={{ height: 320, position: 'relative' }}>
        <img src={trip.cover_photo || trip.coverImage} alt={trip.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={16} /> {trip.destination || trip.place}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={16} /> {new Date(trip.start_date || trip.startDate).toLocaleDateString()} - {new Date(trip.end_date || trip.endDate).toLocaleDateString()}</span>
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
          
          {groupedDays.length === 0 ? (
            <div style={{ background: 'var(--surface)', padding: 48, borderRadius: 'var(--r-lg)', textAlign: 'center', border: '1px dashed var(--border)' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 16 }}>No sections planned yet.</p>
              <Link to={`/trips/${trip.id}/build`} style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Start building your itinerary</Link>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 16, marginBottom: 24 }}>
                {groupedDays.map((day, idx) => (
                  <button
                    key={idx} onClick={() => setActiveDayIdx(idx)}
                    style={{
                      flexShrink: 0, padding: '12px 20px', borderRadius: 'var(--r-md)',
                      background: activeDayIdx === idx ? 'var(--primary)' : 'var(--surface)',
                      color: activeDayIdx === idx ? '#fff' : 'var(--text-main)',
                      border: activeDayIdx === idx ? 'none' : '1px solid var(--border)',
                      fontWeight: 600, cursor: 'pointer', textAlign: 'left', minWidth: 140
                    }}
                  >
                    <div style={{ fontSize: 13, opacity: activeDayIdx === idx ? 0.8 : 0.6, marginBottom: 4 }}>Day {idx + 1}</div>
                    <div style={{ fontSize: 14 }}>{new Date(day.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
                  </button>
                ))}
              </div>

              {currentDay && (
                <div>
                  <h3 style={{ fontSize: 20, fontWeight: 600, color: 'var(--text-main)', marginBottom: 24 }}>
                    {new Date(currentDay.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 24, top: 24, bottom: 24, width: 2, background: 'var(--border)' }} />
                    
                    {currentDay.sections.map((sec) => (
                      <div key={sec.id} style={{ display: 'flex', gap: 24, position: 'relative', zIndex: 1 }}>
                        <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--surface)', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, backgroundColor: '#fff' }}>
                          {TYPE_ICONS[sec.section_type] || <Activity size={20} color="var(--primary)" />}
                        </div>
                        <div style={{ flex: 1, background: '#fff', padding: 20, borderRadius: 'var(--r-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ textTransform: 'uppercase', letterSpacing: 1 }}>{sec.section_type}</span>
                              <span style={{ color: 'var(--text-muted)' }}>•</span>
                              <span>{new Date(sec.date_from).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                            {sec.budget > 0 && <div style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 600 }}>${sec.budget}</div>}
                          </div>
                          <h4 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-main)', marginBottom: 4 }}>{sec.title}</h4>
                          {sec.description && <p style={{ fontSize: 14, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap' }}>{sec.description}</p>}
                        </div>
                      </div>
                    ))}
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
              <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>${trip.budget_breakdown?.total || 0} / ${trip.budget_breakdown?.limit || trip.budget || 0}</span>
            </div>
            <div style={{ height: 8, background: 'var(--surface-high)', borderRadius: 4, overflow: 'hidden', marginBottom: 24 }}>
              <div style={{ height: '100%', width: `${Math.min(100, ((trip.budget_breakdown?.total || 0) / (trip.budget_breakdown?.limit || trip.budget || 1)) * 100)}%`, background: 'var(--primary)', borderRadius: 4 }} />
            </div>
            <Link to={`/trips/${trip.id}/budget`} style={{ fontSize: 14, color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>View detailed breakdown &rarr;</Link>
          </div>

          <div style={{ background: '#fff', padding: 24, borderRadius: 'var(--r-lg)', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-main)', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Users size={18} /> Trip Tools
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Link to={`/trips/${trip.id}/checklist`} style={{ padding: '12px 16px', background: 'var(--surface)', borderRadius: 'var(--r-md)', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 500, fontSize: 14, display: 'flex', justifyContent: 'space-between' }}>
                Packing Checklist <ArrowLeft size={16} style={{ transform: 'rotate(180deg)', color: 'var(--text-muted)' }} />
              </Link>
              <Link to={`/trips/${trip.id}/notes`} style={{ padding: '12px 16px', background: 'var(--surface)', borderRadius: 'var(--r-md)', textDecoration: 'none', color: 'var(--text-main)', fontWeight: 500, fontSize: 14, display: 'flex', justifyContent: 'space-between' }}>
                Travel Notes <ArrowLeft size={16} style={{ transform: 'rotate(180deg)', color: 'var(--text-muted)' }} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
