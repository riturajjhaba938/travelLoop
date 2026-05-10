import React, { useState } from 'react';
import { MoreVertical, Edit2, Trash2, Check, X } from 'lucide-react';

/**
 * Renders the User Management table with inline editing capabilities.
 */
const UsersTable = ({ data, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [activeMenuId, setActiveMenuId] = useState(null);

  const startEdit = (user) => {
    setEditingId(user.id);
    setEditForm(user);
    setActiveMenuId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = () => {
    onUpdate(editForm);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const toggleMenu = (id) => {
    if (activeMenuId === id) setActiveMenuId(null);
    else setActiveMenuId(id);
  };

  return (
    <div className="table-card">
      <div className="table-header">
        <h2>User Management</h2>
        <button className="view-all-btn">View All</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>USER DETAILS</th>
            <th>TRIPS CREATED</th>
            <th>JOINED DATE</th>
            <th>STATUS</th>
            <th>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {data.map(user => {
            const isEditing = editingId === user.id;

            return (
              <tr key={user.id}>
                {isEditing ? (
                  <>
                    <td>
                      <input 
                        type="text" 
                        name="name" 
                        value={editForm.name} 
                        onChange={handleChange} 
                        className="edit-input" 
                        style={{marginBottom: '0.5rem'}}
                      />
                      <input 
                        type="email" 
                        name="email" 
                        value={editForm.email} 
                        onChange={handleChange} 
                        className="edit-input" 
                      />
                    </td>
                    <td>
                      <input 
                        type="number" 
                        name="tripsCount" 
                        value={editForm.tripsCount} 
                        onChange={handleChange} 
                        className="edit-input" 
                      />
                    </td>
                    <td>{user.joined}</td>
                    <td>
                      <select 
                        name="status" 
                        value={editForm.status} 
                        onChange={handleChange} 
                        className="edit-select"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </td>
                    <td>
                      <div className="edit-actions">
                        <button className="save-btn" onClick={handleSave} title="Save"><Check size={18} /></button>
                        <button className="cancel-btn" onClick={cancelEdit} title="Cancel"><X size={18} /></button>
                      </div>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar" aria-hidden="true">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="user-info">
                          <strong>{user.name}</strong>
                          <span className="user-email">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>{user.tripsCount}</td>
                    <td>{user.joined}</td>
                    <td>
                      <span className={`status-badge status-${user.status}`}>
                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ position: 'relative' }}>
                      <button 
                        className="action-btn" 
                        aria-label="More actions"
                        onClick={() => toggleMenu(user.id)}
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {/* Simple Dropdown Menu */}
                      {activeMenuId === user.id && (
                        <div style={{
                          position: 'absolute', right: '10px', top: '40px',
                          background: 'var(--bg-card)', border: '1px solid var(--neutral-border)',
                          boxShadow: 'var(--shadow-md)', borderRadius: '8px', zIndex: 10,
                          display: 'flex', flexDirection: 'column', padding: '0.5rem', gap: '0.25rem', minWidth: '100px'
                        }}>
                          <button onClick={() => startEdit(user)} style={{
                            background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', 
                            cursor: 'pointer', color: 'var(--text-main)', borderRadius: '4px',
                            display: 'flex', alignItems: 'center', gap: '0.5rem'
                          }}>
                            <Edit2 size={14} /> Edit
                          </button>
                          <button onClick={() => { onDelete(user.id); setActiveMenuId(null); }} style={{
                            background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', 
                            cursor: 'pointer', color: 'var(--primary)', borderRadius: '4px',
                            display: 'flex', alignItems: 'center', gap: '0.5rem'
                          }}>
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
