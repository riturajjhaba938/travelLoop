import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255, 255, 255, 0.80)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(235, 235, 235, 0.7)',
      height: 'var(--nav-h)',
    }}>
      <div style={{
        maxWidth: 'var(--max-w)', margin: '0 auto',
        padding: '0 48px', height: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img
            src="/logo-vertical.png"
            alt="TravelLoop"
            style={{ height: 56, width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        {/* Nav Links — dot indicator under active */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
          {[
            { to: '/', label: 'Explore', end: true },
            { to: '/trips', label: 'My Trips' },
            { to: '/community', label: 'Community' },
          ].map(({ to, label, end }) => (
            <NavLink
              key={to} to={to} end={end}
              style={({ isActive }) => ({
                fontFamily: 'var(--font-sans)', fontWeight: isActive ? 600 : 400,
                fontSize: 15, color: isActive ? 'var(--text-main)' : 'var(--text-secondary)',
                textDecoration: 'none',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                paddingBottom: 2, transition: 'color 0.15s',
              })}
            >
              {({ isActive }) => (
                <>
                  <span>{label}</span>
                  {/* Coral dot indicator */}
                  <span style={{
                    width: 5, height: 5, borderRadius: '50%',
                    background: isActive ? 'var(--primary)' : 'transparent',
                    transition: 'background 0.2s',
                  }} />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Right actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate('/trips/new')}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'var(--primary)', color: '#fff',
              border: 'none', borderRadius: 'var(--r-full)',
              padding: '9px 20px', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', transition: 'background 0.2s, box-shadow 0.2s',
              fontFamily: 'var(--font-sans)',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-hover)'; e.currentTarget.style.boxShadow = 'var(--glow-primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            <Plus size={16} /> New Trip
          </button>

          {/* Avatar */}
          <div
            title="Profile"
            onClick={() => navigate('/profile')}
            style={{
              width: 38, height: 38, borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)',
              color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 14, cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              boxShadow: 'var(--shadow-sm)',
              transition: 'transform 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            {user?.firstName?.[0]?.toUpperCase() || 'U'}
          </div>
        </div>
      </div>
    </nav>
  );
}
