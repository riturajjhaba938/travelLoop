import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, MapPin, Star, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { getActivities } from '../api/cities.api';
import Loader from '../components/common/Loader';
import { getPhotoUrl, handleImgError } from '../utils/images';

// Cinematic banner for search page  
const SEARCH_HERO = getPhotoUrl('hero_city_night', 1600);

const CATEGORY_COLORS = {
  CULTURAL:  { bg: 'rgba(0, 166, 153, 0.12)',  text: '#00A699' },
  ADVENTURE: { bg: 'rgba(252, 100, 45, 0.12)', text: '#FC642D' },
  CULINARY:  { bg: 'rgba(255, 180, 0, 0.12)',  text: '#b58700' },
  NATURE:    { bg: 'rgba(34, 197, 94, 0.12)',  text: '#16a34a' },
};

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputVal, setInputVal] = useState(query);

  useEffect(() => {
    setLoading(true);
    getActivities().then(res => {
      setResults(
        query
          ? res.filter(item =>
              (item.name || '').toLowerCase().includes(query.toLowerCase()) ||
              (item.city || item.place || '').toLowerCase().includes(query.toLowerCase())
            )
          : res
      );
      setLoading(false);
    });
  }, [query]);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && inputVal.trim()) {
      setSearchParams({ q: inputVal.trim() });
    }
  };

  return (
    <div>
      {/* ── Search hero banner ── */}
      <section style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
        <img
          src={SEARCH_HERO}
          alt="City at night"
          onError={handleImgError}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.62) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
          <motion.h1
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: 'var(--font-serif)', fontSize: 42, fontWeight: 400, color: '#fff', marginBottom: 24, textAlign: 'center', lineHeight: 1.15 }}
          >
            Discover Experiences
          </motion.h1>
          {/* Glassmorphic search bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{ position: 'relative', width: '100%', maxWidth: 520 }}
          >
            <Search size={18} style={{ position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.75)', zIndex: 1 }} />
            <input
              type="text"
              value={inputVal}
              onChange={e => setInputVal(e.target.value)}
              onKeyDown={handleSearch}
              placeholder="City, activity, or category…"
              style={{
                width: '100%', padding: '16px 20px 16px 48px',
                borderRadius: 'var(--r-full)',
                background: 'rgba(255,255,255,0.18)', backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1.5px solid rgba(255,255,255,0.35)',
                color: '#fff', fontSize: 15, outline: 'none',
                fontFamily: 'var(--font-sans)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* ── Results ── */}
      <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px' }}>
        {loading ? <Loader /> : (
          <>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 400, color: 'var(--text-main)' }}>
                {results.length} {results.length === 1 ? 'Experience' : 'Experiences'}
                {query && <span style={{ fontStyle: 'italic', color: 'var(--text-secondary)', fontWeight: 400 }}> for "{query}"</span>}
              </h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 24 }}>
              {results.map((item, i) => {
                const cat = CATEGORY_COLORS[item.type] || { bg: 'rgba(118,118,118,0.1)', text: '#767676' };
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    whileHover={{ y: -6, boxShadow: 'var(--shadow-lg)' }}
                    style={{
                      background: '#fff', borderRadius: 'var(--r-3xl)',
                      overflow: 'hidden', border: '1px solid var(--border)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <div style={{ height: 190, position: 'relative', overflow: 'hidden' }}>
                      <img
                        src={item.image} alt={item.name}
                        onError={handleImgError}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                        onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                      />
                      {/* Rating badge */}
                      <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', padding: '4px 10px', borderRadius: 'var(--r-full)', fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'var(--font-sans)' }}>
                        <Star size={12} fill="var(--warning)" color="var(--warning)" /> {item.rating}
                      </div>
                    </div>
                    <div style={{ padding: '18px 20px' }}>
                      {/* Category pill */}
                      <span style={{ display: 'inline-block', background: cat.bg, color: cat.text, fontSize: 11, fontWeight: 700, letterSpacing: 1, padding: '3px 10px', borderRadius: 'var(--r-full)', marginBottom: 10, fontFamily: 'var(--font-sans)', textTransform: 'uppercase' }}>
                        {item.type}
                      </span>
                      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 400, color: 'var(--text-main)', marginBottom: 8, lineHeight: 1.2 }}>
                        {item.name}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)', fontSize: 13, fontFamily: 'var(--font-sans)' }}>
                          <MapPin size={12} /> {item.city}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)', fontSize: 13, fontFamily: 'var(--font-sans)' }}>
                          <Clock size={12} /> {item.duration}
                        </div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14, borderTop: '1px solid var(--border)' }}>
                        <div style={{ fontFamily: 'var(--font-sans)', fontSize: 17, fontWeight: 700, color: 'var(--text-main)' }}>
                          ${item.price}
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.96 }}
                          style={{ background: 'var(--primary)', color: '#fff', border: 'none', padding: '8px 18px', borderRadius: 'var(--r-full)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}
                          onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--glow-primary)'}
                          onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
                        >
                          Details
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {results.length === 0 && (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>
                <p style={{ fontSize: 18, marginBottom: 8 }}>No results found.</p>
                <p style={{ fontSize: 15 }}>Try a different city or experience type.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
