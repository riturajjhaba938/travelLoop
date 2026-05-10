import { useState } from 'react';
import { Heart, MessageCircle, Share2, TrendingUp, Compass, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_COMMUNITY_POSTS } from '../mock/data';
import { handleImgError } from '../utils/images';

const cardVariants = {
  hidden: { opacity: 0, y: 32, scale: 0.97 },
  visible: (i) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.09, duration: 0.45, ease: 'easeOut' },
  }),
};

export default function CommunityPage() {
  const [filter, setFilter] = useState('trending');

  const posts = MOCK_COMMUNITY_POSTS.filter(p => filter === 'trending' ? p.trending : true);

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '56px 48px' }}>
      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: 56 }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 700, letterSpacing: 2.5, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: 14 }}
        >
          Community
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: 'var(--font-serif)', fontSize: 50, fontWeight: 400, color: 'var(--text-main)', lineHeight: 1.15, marginBottom: 18 }}
        >
          Traveler Stories
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', fontSize: 17, maxWidth: 540, margin: '0 auto', lineHeight: 1.65 }}
        >
          Get inspired by itineraries, tips, and stories from fellow travelers around the world.
        </motion.p>
      </header>

      {/* Filter tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 52 }}>
        {[
          { id: 'trending', label: 'Trending', icon: <TrendingUp size={15} /> },
          { id: 'latest', label: 'Latest Explorations', icon: <Compass size={15} /> },
        ].map(f => (
          <motion.button
            key={f.id} onClick={() => setFilter(f.id)}
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '11px 26px', borderRadius: 'var(--r-full)',
              background: filter === f.id ? 'var(--primary)' : '#fff',
              color: filter === f.id ? '#fff' : 'var(--text-secondary)',
              border: filter === f.id ? '1.5px solid var(--primary)' : '1.5px solid var(--border)',
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              boxShadow: filter === f.id ? 'var(--glow-primary)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            {f.icon} {f.label}
          </motion.button>
        ))}
      </div>

      {/* Post grid with staggered animation */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: 32 }}>
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ y: -8, boxShadow: 'var(--shadow-lg)' }}
            style={{
              background: '#fff', borderRadius: 'var(--r-3xl)',
              overflow: 'hidden', border: '1px solid var(--border)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {/* Cover image */}
            <div style={{ height: 256, position: 'relative', overflow: 'hidden' }}>
              <img
                src={post.coverImage} alt={post.title}
                onError={handleImgError}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                onMouseLeave={e => e.target.style.transform = 'scale(1)'}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 55%)' }} />
              {/* Location pill */}
              <div style={{
                position: 'absolute', top: 16, left: 16,
                background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(8px)',
                color: '#fff', padding: '5px 14px', borderRadius: 'var(--r-full)',
                fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5,
                fontFamily: 'var(--font-sans)',
              }}>
                <MapPin size={11} style={{ color: 'var(--primary)' }} /> {post.destination}
              </div>
              {/* Trending badge */}
              {post.trending && (
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  background: 'var(--primary)', color: '#fff',
                  padding: '4px 12px', borderRadius: 'var(--r-full)',
                  fontSize: 11, fontWeight: 700, fontFamily: 'var(--font-sans)', letterSpacing: 0.5,
                }}>
                  🔥 Trending
                </div>
              )}
            </div>

            {/* Card body */}
            <div style={{ padding: '24px 26px' }}>
              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, fontFamily: 'var(--font-sans)', flexShrink: 0,
                }}>
                  {post.author.initials}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600, color: 'var(--text-main)' }}>{post.author.name}</div>
                  <div style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: 'var(--text-muted)' }}>{post.postedAgo}</div>
                </div>
              </div>

              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 21, fontWeight: 400, color: 'var(--text-main)', marginBottom: 10, lineHeight: 1.25 }}>
                {post.title}
              </h3>
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 22 }}>
                {post.excerpt}
              </p>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 16, borderTop: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', gap: 20 }}>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)', transition: 'color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--danger)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                  >
                    <Heart size={17} /> {post.likes.toLocaleString()}
                  </button>
                  <button style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'none', border: 'none', color: 'var(--text-secondary)', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }}>
                    <MessageCircle size={17} /> {post.comments}
                  </button>
                </div>
                <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', transition: 'color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--secondary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <Share2 size={17} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
