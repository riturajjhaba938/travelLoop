import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Star, MapPin } from 'lucide-react';
import useTripStore from '../store/useTripStore';
import Loader from '../components/common/Loader';
import TripCard from '../components/trips/TripCard';
import { getActivities } from '../api/cities.api';
import { MOCK_DESTINATIONS, MOCK_FEATURED_TRIPS } from '../mock/data';
import { getPhotoUrl, handleImgError } from '../utils/images';

const HERO_IMG = getPhotoUrl('hero_mountain_lake', 1600);

export default function DashboardPage() {
  const navigate = useNavigate();
  const { trips, fetchTrips, loading } = useTripStore();
  const [activities, setActivities] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    fetchTrips();
    getActivities().then(setActivities);
  }, [fetchTrips]);

  if (loading) return <Loader />;

  const upcomingTrips = trips.filter(t => new Date(t.startDate) >= new Date()).slice(0, 3);

  return (
    <div>
      {/* ── Cinematic Hero ── */}
      <section style={{ position: 'relative', height: 480, overflow: 'hidden' }}>
        <img
          src={HERO_IMG}
          alt="Cinematic travel landscape"
          onError={handleImgError}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)' }} />

        {/* Hero content */}
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
          <motion.p
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600, letterSpacing: 2.5, textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginBottom: 16 }}
          >
            TravelLoop
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ fontFamily: 'var(--font-serif)', fontSize: 54, fontWeight: 400, color: '#fff', textAlign: 'center', lineHeight: 1.15, marginBottom: 36 }}
          >
            Where to next?
          </motion.h1>

          {/* Glassmorphic search bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{ position: 'relative', width: '100%', maxWidth: 560 }}
          >
            <Search size={19} style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: searchFocused ? 'var(--primary)' : 'rgba(255,255,255,0.7)', transition: 'color 0.2s', zIndex: 1 }} />
            <input
              type="text"
              placeholder="Search destinations, activities..."
              onKeyDown={e => e.key === 'Enter' && navigate(`/search?q=${e.target.value}`)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
              style={{
                width: '100%', padding: '18px 20px 18px 52px',
                borderRadius: 'var(--r-full)',
                background: searchFocused ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
                border: `1.5px solid ${searchFocused ? 'var(--primary)' : 'rgba(255,255,255,0.35)'}`,
                color: searchFocused ? 'var(--text-main)' : '#fff',
                fontSize: 16, outline: 'none', fontFamily: 'var(--font-sans)',
                boxShadow: searchFocused ? 'var(--glow-primary)' : '0 8px 32px rgba(0,0,0,0.2)',
                transition: 'all 0.3s ease',
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Page content ── */}
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '56px 48px' }}>

        {/* Upcoming trips */}
        {upcomingTrips.length > 0 && (
          <section style={{ marginBottom: 72 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 400, color: 'var(--text-main)' }}>
                Your Upcoming Trips
              </h2>
              <Link to="/trips" style={{ fontFamily: 'var(--font-sans)', color: 'var(--primary)', fontWeight: 600, fontSize: 14 }}>View All →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
              {upcomingTrips.map(trip => <TripCard key={trip.id} trip={trip} />)}
            </div>
          </section>
        )}

        {/* Popular destinations */}
        <section style={{ marginBottom: 72 }}>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 400, color: 'var(--text-main)', marginBottom: 28 }}>
            Popular Destinations
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
            {MOCK_DESTINATIONS.map((dest) => (
              <motion.div
                key={dest.id}
                whileHover={{ y: -6, boxShadow: 'var(--shadow-lg)' }}
                transition={{ duration: 0.22 }}
                style={{
                  position: 'relative', borderRadius: 'var(--r-3xl)', overflow: 'hidden',
                  height: dest.large ? 360 : 220,
                  gridColumn: dest.large ? 'span 2' : 'span 1',
                  gridRow: dest.large ? 'span 2' : 'span 1',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`/search?q=${dest.name}`)}
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  onError={handleImgError}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0) 55%)' }} />
                <div style={{ position: 'absolute', bottom: 20, left: 20, color: '#fff' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <MapPin size={12} style={{ color: 'var(--primary)' }} />
                    {dest.trending && <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: 1 }}>Trending</span>}
                  </div>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: dest.large ? 26 : 19, fontWeight: 400, marginBottom: 2 }}>{dest.name}</h3>
                  {dest.tagline && <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, opacity: 0.85 }}>{dest.tagline}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured experiences */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 400, color: 'var(--text-main)', marginBottom: 28 }}>
            Featured Experiences
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {MOCK_FEATURED_TRIPS.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.45 }}
                whileHover={{ y: -6, boxShadow: 'var(--shadow-lg)' }}
                style={{ background: '#fff', borderRadius: 'var(--r-3xl)', overflow: 'hidden', border: '1px solid var(--border)', cursor: 'pointer' }}
              >
                <div style={{ position: 'relative', height: 190 }}>
                  <img
                    src={exp.image} alt={exp.name}
                    onError={handleImgError}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 'var(--r-full)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-sans)' }}>
                    <Star size={12} fill="var(--warning)" color="var(--warning)" /> {exp.rating}
                  </div>
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 19, fontWeight: 400, color: 'var(--text-main)', marginBottom: 8 }}>{exp.name}</h3>
                  <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 16 }}>{exp.description}</p>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700, color: 'var(--primary)' }}>From ${exp.price}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
