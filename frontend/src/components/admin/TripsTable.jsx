import React, { useState } from 'react';
import { MoreVertical, Edit2, Trash2, Check, X } from 'lucide-react';

/**
 * Renders the Recent Trips table with inline editing capabilities.
 */
const TripsTable = ({ data, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [activeMenuId, setActiveMenuId] = useState(null);

  const startEdit = (trip) => {
    setEditingId(trip.id);
    setEditForm(trip);
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
        <h2>Recent Trips</h2>
        <button className="view-all-btn">View All</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>TRIP ID</th>
            <th>PROJECT NAME</th>
            <th>USER</th>
            <th>START DATE</th>
            <th>BUDGET</th>
            <th>STATUS</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map(trip => {
            const isEditing = editingId === trip.id;

            return (
              <tr key={trip.id}>
                {isEditing ? (
                  <>
                    <td><strong>{trip.id}</strong></td>
                    <td>
                      <input 
                        type="text" 
                        name="name" 
                        value={editForm.name} 
                        onChange={handleChange} 
                        className="edit-input" 
                      />
                    </td>
                    <td>{trip.user}</td>
                    <td>
                      <input 
                        type="text" 
                        name="startDate" 
                        value={editForm.startDate} 
                        onChange={handleChange} 
                        className="edit-input" 
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        name="budget" 
                        value={editForm.budget} 
                        onChange={handleChange} 
                        className="edit-input" 
                      />
                    </td>
                    <td>
                      <select 
                        name="status" 
                        value={editForm.status} 
                        onChange={handleChange} 
                        className="edit-select"
                      >
                        <option value="upcoming">Upcoming</option>
                        <option value="ongoing">Ongoing</option>
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
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
                    <td><strong>{trip.id}</strong></td>
                    <td>{trip.name}</td>
                    <td>{trip.user}</td>
                    <td>{trip.startDate}</td>
                    <td>{trip.budget}</td>
                    <td>
                      <span className={`status-badge status-${trip.status}`}>
                        {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ position: 'relative' }}>
                      <button 
                        className="action-btn" 
                        aria-label="More options"
                        onClick={() => toggleMenu(trip.id)}
                      >
                        <MoreVertical size={18} />
                      </button>

                      {/* Simple Dropdown Menu */}
                      {activeMenuId === trip.id && (
                        <div style={{
                          position: 'absolute', right: '10px', top: '40px',
                          background: 'var(--bg-card)', border: '1px solid var(--neutral-border)',
                          boxShadow: 'var(--shadow-md)', borderRadius: '8px', zIndex: 10,
                          display: 'flex', flexDirection: 'column', padding: '0.5rem', gap: '0.25rem', minWidth: '100px'
                        }}>
                          <button onClick={() => startEdit(trip)} style={{
                            background: 'none', border: 'none', textAlign: 'left', padding: '0.5rem', 
                            cursor: 'pointer', color: 'var(--text-main)', borderRadius: '4px',
                            display: 'flex', alignItems: 'center', gap: '0.5rem'
                          }}>
                            <Edit2 size={14} /> Edit
                          </button>
                          <button onClick={() => { onDelete(trip.id); setActiveMenuId(null); }} style={{
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

export default TripsTable;
