import { Link } from 'react-router-dom';
import { MapPin, Calendar, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { getDestinationImage, handleImgError } from '../../utils/images';

export default function TripCard({ trip }) {
  // Derive destination-specific image by fuzzy-matching the destination name
  const imgSrc = trip.coverImage || getDestinationImage(trip.destination || trip.name, 600);

  const statusColors = {
    upcoming:  { bg: 'rgba(0, 166, 153, 0.15)', text: '#00A699' },
    ongoing:   { bg: 'rgba(255, 90, 95, 0.15)', text: '#FF5A5F' },
    completed: { bg: 'rgba(118, 118, 118, 0.15)', text: '#767676' },
  };
  const sc = statusColors[trip.status] || statusColors.upcoming;

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
      }}
    >
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
        <div style={{ position: 'absolute', bottom: 14, left: 16, display: 'flex', alignItems: 'center', gap: 5, color: '#fff' }}>
          <MapPin size={13} style={{ color: 'var(--primary)' }} />
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 500 }}>{trip.destination}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 400, color: 'var(--text-main)', marginBottom: 14, lineHeight: 1.2 }}>
          {trip.name}
        </h3>

        <div style={{ display: 'flex', gap: 20, marginBottom: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: 13 }}>
            <Calendar size={13} />
            <span>{new Date(trip.startDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} — {new Date(trip.endDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)', fontSize: 13 }}>
            <Users size={13} />
            <span>{trip.travelers} {trip.travelers === 1 ? 'Traveler' : 'Travelers'}</span>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 700, color: 'var(--text-main)' }}>
            {trip.currency}{trip.budget?.toLocaleString()}
          </div>
          <Link
            to={`/trips/${trip.id}`}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
              color: 'var(--primary)', textDecoration: 'none',
              transition: 'gap 0.2s',
            }}
          >
            View Trip <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
