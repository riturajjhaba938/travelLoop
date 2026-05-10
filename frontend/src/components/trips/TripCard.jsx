import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Users, ArrowRight, Edit3, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { getDestinationImage, handleImgError } from '../../utils/images';
import useTripStore from '../../store/useTripStore';
import toast from 'react-hot-toast';

export default function TripCard({ trip }) {
  const navigate = useNavigate();
  const { deleteTrip } = useTripStore();
  
  const destination = trip.destination || trip.place || '';
  const imgSrc = trip.coverImage || trip.cover_photo || getDestinationImage(destination || trip.name, 600);
  const startDate = trip.startDate || trip.start_date;
  const endDate = trip.endDate || trip.end_date;
  const budget = trip.budget || trip.total_budget || 0;
  const currency = trip.currency || '$';

  const statusColors = {
    upcoming:  { bg: 'rgba(0, 166, 153, 0.15)', text: '#00A699' },
    ongoing:   { bg: 'rgba(255, 90, 95, 0.15)', text: '#FF5A5F' },
    completed: { bg: 'rgba(118, 118, 118, 0.15)', text: '#767676' },
  };
  const sc = statusColors[trip.status] || statusColors.upcoming;

  const handleDelete = async (e) => {
    e.preventDefault();
    if (window.confirm('Are you sure you want to delete this trip? This action cannot be undone.')) {
      try {
        await deleteTrip(trip.id);
        toast.success('Trip deleted');
      } catch (err) {
        toast.error('Failed to delete trip');
      }
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/trips/${trip.id}/build`);
  };

  return (
    <motion.div
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.10)' }}
      transition={{ duration: 0.22 }}
      style={{
        background: '#fff',
        borderRadius: 'var(--r-3xl)',
        overflow: 'hidden',
        border: '1px solid var(--border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative'
      }}
    >
      {/* Action Buttons */}
      <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 10, display: 'flex', gap: 8 }}>
        <button
          onClick={handleEdit}
          style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-main)', boxShadow: 'var(--shadow-sm)' }}
          title="Edit Itinerary"
        >
          <Edit3 size={16} />
        </button>
        <button
          onClick={handleDelete}
          style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(4px)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--error)', boxShadow: 'var(--shadow-sm)' }}
          title="Delete Trip"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Image */}
      <div style={{ position: 'relative', height: 210 }}>
        <img
          src={imgSrc}
          alt={trip.name}
          onError={handleImgError}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 55%)' }} />
        {/* Status badge */}
        <div style={{
          position: 'absolute', top: 14, right: 14,
          background: sc.bg, backdropFilter: 'blur(8px)',
          padding: '4px 12px', borderRadius: 'var(--r-full)',
          fontSize: 11, fontWeight: 700, color: sc.text,
          textTransform: 'capitalize', letterSpacing: 0.5,
          fontFamily: 'var(--font-sans)',
        }}>
          {trip.status}
        </div>
        {/* Destination overlay */}
        {destination && (
          <div style={{ position: 'absolute', bottom: 14, left: 16, display: 'flex', alignItems: 'center', gap: 5 }}>
            <MapPin size={13} style={{ color: 'var(--primary)' }} />
            <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500, color: '#fff' }}>{destination}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 400, color: 'var(--text-main)', marginBottom: 14, lineHeight: 1.2 }}>
          {trip.name}
        </h3>

        <div style={{ display: 'flex', gap: 20, marginBottom: 22 }}>
          {startDate && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: 13 }}>
              <Calendar size={13} />
              <span>
                {new Date(startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                {endDate && ` — ${new Date(endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}`}
              </span>
            </div>
          )}
          {trip.travelers && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: 13 }}>
              <Users size={13} />
              <span>{trip.travelers} {trip.travelers === 1 ? 'Traveler' : 'Travelers'}</span>
            </div>
          )}
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700, color: 'var(--text-main)' }}>
            {budget ? `${currency}${Number(budget).toLocaleString()}` : '—'}
          </div>
          <Link
            to={`/trips/${trip.id}`}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
              color: 'var(--primary)', textDecoration: 'none',
            }}
          >
            View Trip <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
