import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, DollarSign, Sun, Copy, Check, Share2, Globe } from 'lucide-react';
import useTripStore from '../store/useTripStore';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import { getTripById } from '../api/trips.api';
import { getSections } from '../api/sections.api';

export default function SharedItineraryPage() {
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDay, setActiveDay] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchSharedTrip = async () => {
      try {
        setLoading(true);
        const [fetchedTrip, fetchedSections] = await Promise.all([
          getTripById(id),
          getSections(id).catch(() => []) // fallback if sections fail
        ]);
        
        if (fetchedTrip) {
          setTrip(fetchedTrip);
          setSections(fetchedSections);
        } else {
          setError("This shared trip could not be found or has been removed.");
        }
      } catch (err) {
        setError("Failed to load shared trip.");
      } finally {
        setLoading(false);
      }
    };
    fetchSharedTrip();
  }, [id]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <Loader />;
  if (error) return <div style={{ padding: 48, textAlign: 'center' }}><ErrorMessage message={error} /></div>;
  if (!trip) return null;

  const currentDay = sections[activeDay];

  return (
    <div style={{ background: '#fafafa', minHeight: '100vh', paddingBottom: 48 }}>
      {/* Banner */}
      <div style={{ height: 400, position: 'relative' }}>
        <img src={trip.cover_photo || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80'} alt={trip.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.1))' }} />
        
        {/* Top Navbar for Public View */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, padding: '20px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: '#fff', fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-serif)' }}>
            <Globe color="var(--primary)" /> TravelLoop
          </div>
          <Link to="/" style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: '#fff', padding: '8px 16px', borderRadius: 'var(--r-full)', textDecoration: 'none', fontSize: 14, fontWeight: 600, border: '1px solid rgba(255,255,255,0.3)' }}>
            Create Your Own Trip
          </Link>
        </div>

        <div style={{ position: 'absolute', bottom: 48, left: 48, right: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ color: '#fff' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: '#fff', padding: '6px 14px', borderRadius: 'var(--r-full)', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
              <Share2 size={14} /> Shared Itinerary
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 48, fontWeight: 700, marginBottom: 12 }}>{trip.name}</h1>
            <div style={{ display: 'flex', gap: 24, fontSize: 16, opacity: 0.9 }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><MapPin size={18} /> {trip.place}</span>
              {trip.start_date && trip.end_date && <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={18} /> {new Date(trip.start_date).toLocaleDateString()} - {new Date(trip.end_date).toLocaleDateString()}</span>}
            </div>
          </div>
          <button 
            onClick={handleCopyLink}
            style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: 'var(--r-full)', fontWeight: 600, fontSize: 15, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', transition: 'all 0.2s' }}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? 'Link Copied!' : 'Copy Trip Link'}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px', display: 'flex', gap: 48 }}>
        {/* Left Column: Itinerary */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: 'var(--text-main)' }}>The Journey</h2>
          </div>
          
          {sections.length === 0 ? (
            <div style={{ background: '#fff', padding: 48, borderRadius: 'var(--r-xl)', textAlign: 'center', border: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>This trip has no activities planned yet.</p>
            </div>
          ) : (
            <>
              {/* Day Tabs */}
              <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 16, marginBottom: 32, WebkitOverflowScrolling: 'touch' }}>
                {sections.map((section, idx) => (
                  <button
                    key={section.id} onClick={() => setActiveDay(idx)}
                    style={{
                      flexShrink: 0, padding: '14px 24px', borderRadius: 'var(--r-lg)',
                      background: activeDay === idx ? '#fff' : 'transparent',
                      color: activeDay === idx ? 'var(--primary)' : 'var(--text-secondary)',
                      border: activeDay === idx ? '1px solid var(--border)' : '1px solid transparent',
                      boxShadow: activeDay === idx ? 'var(--shadow-sm)' : 'none',
                      fontWeight: 600, cursor: 'pointer', textAlign: 'left', minWidth: 150, transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ fontSize: 13, opacity: activeDay === idx ? 1 : 0.7, marginBottom: 4 }}>Section {idx + 1}</div>
                    <div style={{ fontSize: 15, color: activeDay === idx ? 'var(--text-main)' : 'inherit' }}>{section.title || (section.date_from ? new Date(section.date_from).toLocaleDateString() : 'Activity')}</div>
                  </button>
                ))}
              </div>

              {/* Day Content */}
              {currentDay && (
                <div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-main)', marginBottom: 24, paddingLeft: 8 }}>{currentDay.title}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'relative', paddingLeft: 8 }}>
                    <div style={{ position: 'absolute', left: 32, top: 24, bottom: 24, width: 2, background: 'var(--surface-high)' }} />
                    
                    <div style={{ display: 'flex', gap: 24, position: 'relative', zIndex: 1 }}>
                        <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#fff', border: '2px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0, boxShadow: 'var(--shadow-sm)' }}>
                          📍
                        </div>
                        <div style={{ flex: 1, background: '#fff', padding: 24, borderRadius: 'var(--r-xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                              {currentDay.date_from ? new Date(currentDay.date_from).toLocaleDateString() : ''}
                            </div>
                            <div style={{ fontSize: 14, color: 'var(--text-muted)', fontWeight: 500 }}>{currentDay.budget > 0 ? `$${currentDay.budget}` : 'Free'}</div>
                          </div>
                          <h4 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-main)', marginBottom: 8 }}>{currentDay.title}</h4>
                          <p style={{ fontSize: 15, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{currentDay.description}</p>
                        </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Right Column: Widgets */}
        <div style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Weather Widget */}
          {trip.weather && (
            <div style={{ background: '#fff', padding: 28, borderRadius: 'var(--r-xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sun size={18} color="#F59E0B" /> Expected Weather
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
                <div style={{ fontSize: 42, fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-1px' }}>{trip.weather.high}°</div>
                <div style={{ fontSize: 15, color: 'var(--text-secondary)' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: 2 }}>{trip.weather.condition}</div>
                  Low: {trip.weather.low}°
                </div>
              </div>
              <p style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{trip.weather.note}</p>
            </div>
          )}

          {/* Quick Info Widget */}
          <div style={{ background: '#fff', padding: 28, borderRadius: 'var(--r-xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-main)', marginBottom: 20 }}>Trip Highlights</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Duration</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{days.length} Days</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Travelers</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{trip.travelers || 1} People</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: 15 }}>Est. Budget</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{trip.currency}{trip.budget}</span>
              </div>
            </div>
          </div>
          
          {/* CTA Widget */}
          <div style={{ background: 'var(--surface-high)', padding: 32, borderRadius: 'var(--r-xl)', textAlign: 'center' }}>
            <div style={{ width: 48, height: 48, background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <Globe size={24} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-main)', marginBottom: 8 }}>Inspired by this trip?</h3>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 20, lineHeight: 1.5 }}>Use TravelLoop to plan, budget, and organize your next adventure perfectly.</p>
            <Link to="/register" style={{ display: 'block', background: 'var(--primary)', color: '#fff', padding: '12px', borderRadius: 'var(--r-full)', fontWeight: 600, textDecoration: 'none' }}>
              Start Planning Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
