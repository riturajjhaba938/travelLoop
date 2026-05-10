import { useAuth } from '../context/AuthContext';
import { MapPin, Plane, Globe, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ background: '#fff', borderRadius: 'var(--r-xl)', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ height: 160, background: 'linear-gradient(to right, var(--primary), #004d47)' }} />
        
        <div style={{ padding: '0 40px 40px', position: 'relative' }}>
          <div style={{ width: 120, height: 120, borderRadius: '50%', background: '#fff', border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 700, color: 'var(--primary)', marginTop: -60, marginBottom: 24, boxShadow: 'var(--shadow-sm)' }}>
            {user.firstName[0]}{user.lastName[0]}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 32, fontWeight: 700, color: 'var(--text-main)', marginBottom: 8 }}>
                {user.firstName} {user.lastName}
              </h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 15, marginBottom: 24 }}>
                <MapPin size={16} /> {user.location}
              </div>
            </div>
            <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-full)', fontSize: 14, fontWeight: 600, color: 'var(--error)', cursor: 'pointer' }}>
              <LogOut size={16} /> Sign Out
            </button>
          </div>

          <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-main)', marginBottom: 32, maxWidth: 600 }}>
            {user.bio}
          </p>

          <div style={{ display: 'flex', gap: 40, paddingBottom: 32, borderBottom: '1px solid var(--border)', marginBottom: 32 }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>{user.tripsTaken}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}><Plane size={14} /> Trips Taken</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>{user.countriesVisited}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}><Globe size={14} /> Countries</div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-main)', marginBottom: 16 }}>Travel Style</h3>
            <div style={{ display: 'flex', gap: 12 }}>
              {user.travelStyle.map(style => (
                <div key={style} style={{ padding: '6px 16px', background: 'var(--surface-high)', borderRadius: 'var(--r-full)', fontSize: 13, fontWeight: 600, color: 'var(--text-main)' }}>
                  {style}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
