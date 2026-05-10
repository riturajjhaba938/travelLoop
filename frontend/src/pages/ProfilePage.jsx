import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MapPin, Plane, Globe, LogOut, Edit2, Check, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.first_name || user?.firstName || '',
    lastName: user?.last_name || user?.lastName || '',
    location: user?.location || '',
    bio: user?.bio || '',
    language: 'English',
  });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSave = () => {
    // In a real app, you would call an API to save here.
    setIsEditing(false);
    // For mock, we'd update user context or state, but since it's hardcoded mock, we just toggle UI.
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (!user) return null;

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '48px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, color: 'var(--text-main)' }}>Settings</h1>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: '#FEF2F2', border: 'none', borderRadius: 'var(--r-full)', fontSize: 14, fontWeight: 600, color: '#DC2626', cursor: 'pointer', transition: 'all 0.2s' }}>
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: 'var(--r-2xl)', border: '1px solid var(--border)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ height: 160, background: 'linear-gradient(to right, var(--primary), var(--secondary))' }} />
        
        <div style={{ padding: '0 40px 40px', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ width: 120, height: 120, borderRadius: '50%', background: '#fff', border: '4px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 40, fontWeight: 700, color: 'var(--primary)', marginTop: -60, marginBottom: 24, boxShadow: 'var(--shadow-sm)' }}>
              {(formData.firstName[0] || '') + (formData.lastName[0] || '')}
            </div>
            
            <div style={{ marginTop: 24 }}>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-full)', fontSize: 14, fontWeight: 600, color: 'var(--text-main)', cursor: 'pointer' }}>
                  <Edit2 size={16} /> Edit Profile
                </button>
              ) : (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setIsEditing(false)} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-full)', fontSize: 14, fontWeight: 600, color: 'var(--text-main)', cursor: 'pointer' }}>
                    <X size={16} /> Cancel
                  </button>
                  <button onClick={handleSave} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 20px', background: 'var(--primary)', border: 'none', borderRadius: 'var(--r-full)', fontSize: 14, fontWeight: 600, color: '#fff', cursor: 'pointer' }}>
                    <Check size={16} /> Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>

          {!isEditing ? (
            <>
              <div>
                <h2 style={{ fontFamily: 'var(--font-sans)', fontSize: 28, fontWeight: 700, color: 'var(--text-main)', marginBottom: 8 }}>
                  {formData.firstName} {formData.lastName}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontSize: 15, marginBottom: 24 }}>
                  <MapPin size={16} /> {formData.location} • {formData.language}
                </div>
              </div>

              <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--text-main)', marginBottom: 32, maxWidth: 600 }}>
                {formData.bio}
              </p>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 32, maxWidth: 600 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>First Name</label>
                  <input name="firstName" value={formData.firstName} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', fontSize: 15 }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Last Name</label>
                  <input name="lastName" value={formData.lastName} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', fontSize: 15 }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Location</label>
                  <input name="location" value={formData.location} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', fontSize: 15 }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Language Preference</label>
                  <select name="language" value={formData.language} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', fontSize: 15, background: '#fff' }}>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>Bio</label>
                <textarea name="bio" value={formData.bio} onChange={handleChange} rows={4} style={{ width: '100%', padding: '12px', borderRadius: 'var(--r-md)', border: '1px solid var(--border)', fontSize: 15, resize: 'vertical' }} />
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 40, paddingBottom: 32, borderBottom: '1px solid var(--border)', marginBottom: 32 }}>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>{user.tripsTaken || 0}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}><Plane size={14} /> Trips Taken</div>
            </div>
            <div>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-main)', marginBottom: 4 }}>{user.countriesVisited || 0}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}><Globe size={14} /> Countries</div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-main)', marginBottom: 16 }}>Travel Style</h3>
            <div style={{ display: 'flex', gap: 12 }}>
              {(user.travelStyle || ['Adventure', 'Culture']).map(style => (
                <div key={style} style={{ padding: '6px 16px', background: 'var(--surface-high)', borderRadius: 'var(--r-full)', fontSize: 13, fontWeight: 600, color: 'var(--text-main)' }}>
                  {style}
                </div>
              ))}
            </div>
          </div>
          
          {/* Delete Account Zone */}
          {isEditing && (
             <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px dashed #DC2626' }}>
               <h3 style={{ fontSize: 16, fontWeight: 600, color: '#DC2626', marginBottom: 8 }}>Danger Zone</h3>
               <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>Permanently delete your account and all of your travel data.</p>
               <button style={{ padding: '10px 20px', background: '#fff', border: '1px solid #DC2626', borderRadius: 'var(--r-md)', color: '#DC2626', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>Delete Account</button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}
