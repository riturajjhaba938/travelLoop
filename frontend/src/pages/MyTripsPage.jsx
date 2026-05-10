import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Filter } from 'lucide-react';
import useTripStore from '../store/useTripStore';
import Loader from '../components/common/Loader';
import TripCard from '../components/trips/TripCard';

export default function MyTripsPage() {
  const { trips, fetchTrips, loading } = useTripStore();
  const [filter, setFilter] = useState('all'); // all, upcoming, past
  
  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);

  if (loading) return <Loader />;

  const filteredTrips = trips.filter(t => {
    if (filter === 'all') return true;
    const isPast = new Date(t.endDate) < new Date();
    return filter === 'past' ? isPast : !isPast;
  });

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '48px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 }}>
        <div>
          <h1 style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 32, fontWeight: 700, color: 'var(--text-main)', marginBottom: 8 }}>
            My Trips
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 15 }}>
            You have {trips.length} total trips planned.
          </p>
        </div>
        <Link to="/trips/new" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--primary-btn)', color: '#fff',
          padding: '12px 24px', borderRadius: 'var(--r-full)',
          fontSize: 15, fontWeight: 600, textDecoration: 'none',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <Plus size={18} /> Create New Trip
        </Link>
      </header>

      <div style={{ display: 'flex', gap: 12, marginBottom: 32 }}>
        {['all', 'upcoming', 'past'].map(f => (
          <button
            key={f} onClick={() => setFilter(f)}
            style={{
              padding: '8px 16px', borderRadius: 'var(--r-full)',
              background: filter === f ? 'var(--primary)' : 'var(--surface)',
              color: filter === f ? '#fff' : 'var(--text-secondary)',
              border: filter === f ? 'none' : '1px solid var(--border)',
              fontSize: 14, fontWeight: 600, cursor: 'pointer',
              textTransform: 'capitalize', transition: 'all 0.2s'
            }}
          >
            {f} Trips
          </button>
        ))}
      </div>

      {filteredTrips.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', background: 'var(--surface)', borderRadius: 'var(--r-lg)', border: '1px dashed var(--border)' }}>
          <div style={{ width: 64, height: 64, background: 'var(--surface-high)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <Filter size={24} color="var(--text-muted)" />
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-main)', marginBottom: 8 }}>No trips found</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: 14, marginBottom: 24 }}>You don't have any {filter !== 'all' ? filter : ''} trips yet.</p>
          <Link to="/trips/new" style={{ color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>Start planning now</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
          {filteredTrips.map(trip => <TripCard key={trip.id} trip={trip} />)}
        </div>
      )}
    </div>
  );
}
