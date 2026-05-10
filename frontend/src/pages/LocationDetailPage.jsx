import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeft, ChevronRight, Calendar, DollarSign, Globe, Clock, 
  Thermometer, MapPin, Landmark, Utensils, Mountain, Eye, TreePine, 
  HeartPulse, History, Plus, Heart, Share2, Twitter, Instagram, Link as LinkIcon,
  Lightbulb
} from 'lucide-react';
import { getLocationBySlug, LOCATIONS } from '../mock/locationData';
import toast from 'react-hot-toast';

const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: 'var(--bg)' }}>
    <div style={{ width: 40, height: 40, border: '3px solid var(--border)', borderTopColor: 'var(--primary)', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

export default function LocationDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [location, setLocation] = useState(null);
  const [activeGalleryImg, setActiveGalleryImg] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');
  const [isWishlist, setIsWishlist] = useState(false);

  // Refs for scroll spy
  const sectionRefs = {
    overview: useRef(null),
    highlights: useRef(null),
    activities: useRef(null),
    gallery: useRef(null),
    weather: useRef(null),
    food: useRef(null),
  };

  useEffect(() => {
    let data = getLocationBySlug(slug);
    if (!data) {
      // Use Seoul as a beautiful fallback for dynamically fetched cities we don't have explicit mock data for
      const fallbackName = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      data = { 
        ...LOCATIONS[0], 
        id: `fallback-${slug}`,
        slug: slug,
        name: fallbackName,
        heroImage: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=1600',
        coverImage: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=800'
      };
    }
    setLocation(data);
    window.scrollTo(0, 0);
  }, [slug, navigate]);

  if (!location) return <Loader />;

  const scrollToSection = (id) => {
    setActiveTab(id);
    const yOffset = -140; // sticky offset
    const element = sectionRefs[id].current;
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleWishlist = () => {
    setIsWishlist(!isWishlist);
    if (!isWishlist) {
      toast.success("Added to Wishlist! ❤️", { style: { background: 'var(--surface)', color: 'var(--text-main)' } });
    }
  };

  const shareToast = () => {
    toast.success("Link copied to clipboard! 🔗", { style: { background: 'var(--surface)', color: 'var(--text-main)' } });
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'Cultural': return <Landmark size={18} />;
      case 'Food & Drink':
      case 'Culinary': return <Utensils size={18} />;
      case 'Adventure': return <Mountain size={18} />;
      case 'Sightseeing': return <Eye size={18} />;
      case 'Nature': return <TreePine size={18} />;
      case 'Wellness': return <HeartPulse size={18} />;
      case 'History': return <History size={18} />;
      default: return <MapPin size={18} />;
    }
  };

  const getFoodEmoji = (name) => {
    const n = name.toLowerCase();
    if (n.includes('noodle') || n.includes('thukpa') || n.includes('ramen')) return '🍜';
    if (n.includes('meat') || n.includes('mutton') || n.includes('pork') || n.includes('chicken')) return '🍖';
    if (n.includes('sweet') || n.includes('cookie') || n.includes('brûlée') || n.includes('wafel') || n.includes('pastry')) return '🍰';
    if (n.includes('veg') || n.includes('salad')) return '🥗';
    if (n.includes('egg')) return '🍳';
    if (n.includes('pizza')) return '🍕';
    if (n.includes('burger')) return '🍔';
    return '🍽️';
  };

  const similarLocations = LOCATIONS.filter(l => l.id !== location.id).slice(0, 3);

  // Animations
  const pageVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.4 } } };
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.12, duration: 0.4 } })
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={pageVariants} style={{ background: 'var(--bg)', minHeight: '100vh', paddingBottom: 0 }}>
      {/* SECTION 1: HERO */}
      <section style={{ 
        position: 'relative', width: '100%', height: 'min(520px, 60vh)', 
        background: `url(${location.heroImage}) center/cover no-repeat`,
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.20) 40%, rgba(0,0,0,0.85) 100%)' }} />
        
        <button 
          onClick={() => navigate(-1)}
          style={{ position: 'absolute', top: 24, left: 32, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)', color: 'white', borderRadius: 999, padding: '8px 18px', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer', zIndex: 10, fontSize: 14, fontWeight: 500 }}
        >
          <ChevronLeft size={16} /> Back
        </button>

        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '48px 64px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 24 }}>
            {/* Left */}
            <div style={{ maxWidth: 800 }}>
              <motion.span custom={0} variants={textVariants} style={{ background: 'rgba(255,90,95,0.85)', color: 'white', borderRadius: 999, padding: '5px 14px', fontSize: 12, fontWeight: 700, display: 'inline-block' }}>
                {location.category}
              </motion.span>
              <motion.h1 custom={1} variants={textVariants} style={{ fontSize: 'clamp(36px, 5vw, 56px)', fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginTop: 10, marginBottom: 6, lineHeight: 1.1 }}>
                {location.name}
              </motion.h1>
              <motion.div custom={2} variants={textVariants} style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <MapPin size={16} /> {location.country}
              </motion.div>
              <motion.p custom={3} variants={textVariants} style={{ fontSize: 16, fontStyle: 'italic', color: 'rgba(255,255,255,0.65)', marginTop: 4 }}>
                {location.tagline}
              </motion.p>
              
              <motion.div custom={4} variants={textVariants} style={{ marginTop: 16, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {location.tags.map(tag => (
                  <span key={tag} style={{ background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: 12, fontWeight: 600, padding: '4px 12px', borderRadius: 999, backdropFilter: 'blur(4px)' }}>
                    {tag}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Right */}
            <motion.div custom={5} variants={textVariants} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 16, padding: '16px 24px', textAlign: 'center', minWidth: 160 }}>
              <div style={{ color: '#fbbf24', fontSize: 18, letterSpacing: 2, marginBottom: 4 }}>★★★★★</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: 'white', lineHeight: 1 }}>{location.rating}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', marginTop: 2 }}>out of 5.0</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginTop: 8 }}>{location.reviewCount.toLocaleString()} reviews</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: QUICK INFO BAR */}
      <section style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', position: 'relative', zIndex: 5 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', minHeight: 72, flexWrap: 'wrap' }}>
          {[
            { icon: Calendar, label: 'Best Time to Visit', value: location.bestTime },
            { icon: DollarSign, label: 'Price Level', value: `${location.priceLevel} Mid-Range` },
            { icon: Globe, label: 'Language', value: location.language },
            { icon: Clock, label: 'Timezone', value: location.timezone },
            { icon: Thermometer, label: 'Climate', value: 'Temperate' }
          ].map((info, idx, arr) => (
            <div key={idx} style={{ flex: '1 1 200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', borderRight: idx < arr.length - 1 ? '1px solid var(--border)' : 'none', padding: '12px 24px', textAlign: 'center' }}>
              <info.icon size={16} style={{ color: 'var(--primary)', marginBottom: 2 }} />
              <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 2 }}>{info.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>{info.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: MAIN CONTENT */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px 32px 80px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: 48, alignItems: 'start' }}>
        
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
          
          {/* 3a: TAB NAVIGATION */}
          <div style={{ position: 'sticky', top: 64, zIndex: 10, background: 'var(--bg)', borderBottom: '1px solid var(--border)', display: 'flex', gap: 0, overflowX: 'auto', msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'highlights', label: 'Highlights' },
              { id: 'activities', label: 'Activities' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'weather', label: 'Weather' },
              { id: 'food', label: 'Food & Tips' }
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                style={{ padding: '14px 20px', fontFamily: 'Be Vietnam Pro, sans-serif', fontSize: 14, fontWeight: 600, whiteSpace: 'nowrap', background: 'transparent', border: 'none', borderBottom: `2px solid ${activeTab === tab.id ? 'var(--primary)' : 'transparent'}`, color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)', cursor: 'pointer', transition: 'all 0.2s' }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 3b: OVERVIEW */}
          <section ref={sectionRefs.overview} id="overview">
            <h2 style={{ fontSize: 24, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, color: 'var(--text-main)', borderLeft: '3px solid var(--primary)', paddingLeft: 16, marginBottom: 20 }}>
              About {location.name}
            </h2>
            <p style={{ fontSize: 17, fontFamily: 'Be Vietnam Pro, sans-serif', fontWeight: 400, color: 'var(--text-secondary)', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
              {location.overview}
            </p>
          </section>

          {/* 3c: HIGHLIGHTS */}
          <section ref={sectionRefs.highlights} id="highlights">
            <h2 style={{ fontSize: 24, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, color: 'var(--text-main)', borderLeft: '3px solid var(--primary)', paddingLeft: 16, marginBottom: 20 }}>
              Top Highlights
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {location.highlights.map((hl, i) => (
                <motion.div key={i} whileHover={{ scale: 1.03, filter: 'brightness(1.05)' }} transition={{ duration: 0.3 }} style={{ position: 'relative', height: 200, borderRadius: 16, overflow: 'hidden', cursor: 'pointer' }}>
                  <img src={hl.image} alt={hl.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 70%)' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '16px 20px' }}>
                    <div style={{ fontSize: 15, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, color: 'white' }}>{hl.title}</div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{hl.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 3d: ACTIVITIES */}
          <section ref={sectionRefs.activities} id="activities">
            <h2 style={{ fontSize: 24, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, color: 'var(--text-main)', borderLeft: '3px solid var(--primary)', paddingLeft: 16, marginBottom: 20 }}>
              Things to Do
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {location.activities.map((act, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: idx * 0.06 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)', cursor: 'default', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary)'; e.currentTarget.style.transform = 'translateX(4px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)', flexShrink: 0 }}>
                    {getActivityIcon(act.type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-main)' }}>{act.name}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, background: 'var(--bg)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: 999 }}>{act.type}</span>
                      <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>⏱ {act.duration}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: act.price === 'Free' ? 'var(--secondary)' : 'var(--primary)' }}>{act.price}</div>
                    <div style={{ fontSize: 12, color: '#fbbf24', marginTop: 4 }}>★ {act.rating}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 3e: GALLERY */}
          <section ref={sectionRefs.gallery} id="gallery">
            <h2 style={{ fontSize: 24, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, color: 'var(--text-main)', borderLeft: '3px solid var(--primary)', paddingLeft: 16, marginBottom: 20 }}>
              Photo Gallery
            </h2>
            <div style={{ position: 'relative', width: '100%', height: 400, borderRadius: 16, overflow: 'hidden', background: 'var(--surface)' }}>
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeGalleryImg}
                  src={location.gallery[activeGalleryImg]}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </AnimatePresence>
              
              <button 
                onClick={() => setActiveGalleryImg(p => p === 0 ? location.gallery.length - 1 : p - 1)}
                style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}
              ><ChevronLeft size={20} /></button>
              
              <button 
                onClick={() => setActiveGalleryImg(p => p === location.gallery.length - 1 ? 0 : p + 1)}
                style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', width: 40, height: 40, borderRadius: '50%', background: 'rgba(0,0,0,0.5)', color: 'white', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 2 }}
              ><ChevronRight size={20} /></button>
            </div>
            
            <div style={{ display: 'flex', gap: 8, marginTop: 12, overflowX: 'auto', paddingBottom: 8, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
              {location.gallery.map((img, i) => (
                <img 
                  key={i} 
                  src={img} 
                  onClick={() => setActiveGalleryImg(i)}
                  style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8, cursor: 'pointer', flexShrink: 0, opacity: activeGalleryImg === i ? 1 : 0.5, border: activeGalleryImg === i ? '2px solid var(--primary)' : '2px solid transparent', transition: 'all 0.2s' }} 
                />
              ))}
            </div>
          </section>

          {/* 3f: WEATHER */}
          <section ref={sectionRefs.weather} id="weather">
            <h2 style={{ fontSize: 24, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, color: 'var(--text-main)', borderLeft: '3px solid var(--primary)', paddingLeft: 16, marginBottom: 20 }}>
              Weather & Best Time to Visit
            </h2>
            <div style={{ background: 'var(--surface)', padding: 24, borderRadius: 16, border: '1px solid var(--border)' }}>
              <div style={{ display: 'inline-block', background: 'rgba(56, 189, 248, 0.15)', color: 'var(--secondary)', borderRadius: 999, padding: '6px 16px', fontSize: 13, fontWeight: 600, marginBottom: 24 }}>
                ✓ Best time: {location.bestTime}
              </div>
              
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 120 }}>
                {location.weather.map((w, i) => {
                  const isBest = location.bestTime.includes(w.month);
                  const h = Math.max(8, (w.temp / 35) * 80);
                  return (
                    <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{w.temp}°</span>
                      <div style={{ width: '100%', height: h, background: 'var(--primary)', borderRadius: '4px 4px 0 0', opacity: isBest ? 1 : 0.3 }} />
                      <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{w.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* 3g/3h: FOOD & TIPS */}
          <section ref={sectionRefs.food} id="food">
            <h2 style={{ fontSize: 24, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, color: 'var(--text-main)', borderLeft: '3px solid var(--primary)', paddingLeft: 16, marginBottom: 20 }}>
              Must Try Food
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12, marginBottom: 40 }}>
              {location.mustEat.map((food, i) => (
                <div key={i} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                    {getFoodEmoji(food.dish)}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)' }}>{food.dish}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: 4 }}>{food.description}</div>
                  </div>
                </div>
              ))}
            </div>

            <h2 style={{ fontSize: 24, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, color: 'var(--text-main)', borderLeft: '3px solid var(--primary)', paddingLeft: 16, marginBottom: 20 }}>
              Insider Travel Tips
            </h2>
            <div>
              {location.travelTips.map((tip, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 16 }}
                >
                  <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(255,90,95,0.1)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <Lightbulb size={16} />
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.7, paddingTop: 6 }}>{tip}</div>
                </motion.div>
              ))}
            </div>
          </section>

        </div>

        {/* RIGHT COLUMN (STICKY SIDEBAR) */}
        <div style={{ position: 'sticky', top: 80, display: 'flex', flexDirection: 'column', gap: 16 }}>
          
          {/* Plan Trip Card */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
            <div style={{ height: 120, background: `url(${location.coverImage}) center/cover` }}>
              <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to top, var(--surface) 0%, transparent 100%)' }} />
            </div>
            <div style={{ padding: 24, paddingTop: 10 }}>
              <h3 style={{ fontSize: 18, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, color: 'var(--text-main)' }}>Plan Your Trip to {location.name}</h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4, marginBottom: 20 }}>Add to a new or existing itinerary</p>
              
              <button onClick={() => navigate('/trips/new')} style={{ width: '100%', height: 48, background: 'var(--primary)', color: 'white', borderRadius: 999, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 15, fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.target.style.background = 'var(--primary-hover)'} onMouseLeave={e => e.target.style.background = 'var(--primary)'}>
                <Plus size={18} /> Start Planning
              </button>
              
              <button onClick={handleWishlist} style={{ width: '100%', height: 44, marginTop: 12, background: 'transparent', border: `1.5px solid ${isWishlist ? 'var(--primary)' : 'var(--border)'}`, color: isWishlist ? 'var(--primary)' : 'var(--text-main)', borderRadius: 999, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}>
                <Heart size={16} fill={isWishlist ? "currentColor" : "none"} /> {isWishlist ? 'Saved to Wishlist' : 'Save to Wishlist'}
              </button>

              <div style={{ marginTop: 24, textAlign: 'center' }}>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12, position: 'relative' }}>
                  <span style={{ background: 'var(--surface)', padding: '0 8px', position: 'relative', zIndex: 1 }}>Share this destination</span>
                  <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: 'var(--border)', zIndex: 0 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
                  {[Twitter, Instagram, LinkIcon].map((Icon, i) => (
                    <button key={i} onClick={shareToast} style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--primary)'; }} onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}>
                      <Icon size={16} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Budget Guide Card */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-main)', marginBottom: 16 }}>💰 Budget Guide</h3>
            {[
              { label: '🎒 Budget Traveler', value: location.budget.budget },
              { label: '✈️ Mid-Range', value: location.budget.mid },
              { label: '👑 Luxury', value: location.budget.luxury }
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{row.label}</span>
                <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-main)' }}>{row.value}</span>
              </div>
            ))}
            <div style={{ fontSize: 11, color: 'var(--text-muted)', fontStyle: 'italic', marginTop: 12 }}>Prices per person per day. Excludes flights.</div>
          </div>

          {/* Quick Facts Card */}
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 16, padding: 20 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-main)', marginBottom: 16 }}>⚡ Quick Facts</h3>
            {[
              { label: 'Currency', value: location.currency },
              { label: 'Best Season', value: location.bestTime.split(',')[0] },
              { label: 'Visa', value: 'Check requirements' },
              { label: 'Safety', value: 'Generally Safe' },
              { label: 'Language', value: location.language },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{row.label}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-main)' }}>{row.value}</span>
              </div>
            ))}
          </div>
          
        </div>
      </div>

      {/* SECTION 4: SIMILAR DESTINATIONS */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '0 32px 80px' }}>
        <h2 style={{ fontSize: 22, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, color: 'var(--text-main)', marginBottom: 24 }}>You Might Also Like</h2>
        <div style={{ display: 'flex', gap: 16, overflowX: 'auto', paddingBottom: 16, msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          {similarLocations.map(loc => (
            <motion.div 
              key={loc.id}
              whileHover={{ scale: 1.03 }}
              onClick={() => navigate(`/location/${loc.slug}`)}
              style={{ width: 280, flexShrink: 0, background: 'var(--surface)', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', border: '1px solid var(--border)' }}
            >
              <img src={loc.coverImage} alt={loc.name} style={{ width: 280, height: 180, objectFit: 'cover' }} />
              <div style={{ padding: 16 }}>
                <span style={{ fontSize: 10, fontWeight: 700, background: 'var(--bg)', color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: 999 }}>{loc.category}</span>
                <div style={{ fontSize: 16, fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, color: 'var(--text-main)', marginTop: 8 }}>{loc.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{loc.country}</div>
                <div style={{ fontSize: 12, color: '#fbbf24', marginTop: 8 }}>★ {loc.rating}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </motion.div>
  );
}
