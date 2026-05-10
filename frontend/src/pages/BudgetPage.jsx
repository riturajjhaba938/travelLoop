import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, DollarSign, TrendingUp, AlertTriangle, CheckCircle, Utensils, Car, BedDouble, Camera, ShoppingBag, Zap } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useTripStore from '../store/useTripStore';
import Loader from '../components/common/Loader';

const CATEGORY_CONFIG = {
  food:          { label: 'Dining & Food',    icon: Utensils,    color: '#FF5A5F' },
  transport:     { label: 'Transport',         icon: Car,         color: '#00A699' },
  accommodation: { label: 'Accommodation',     icon: BedDouble,   color: '#FC642D' },
  sightseeing:   { label: 'Sightseeing',       icon: Camera,      color: '#8B5CF6' },
  experience:    { label: 'Experiences',       icon: Zap,         color: '#F59E0B' },
  shopping:      { label: 'Shopping',          icon: ShoppingBag, color: '#10B981' },
};

const DEFAULT_BREAKDOWN = [
  { category: 'food',          amount: 420,  budget: 500  },
  { category: 'transport',     amount: 680,  budget: 700  },
  { category: 'accommodation', amount: 1200, budget: 1400 },
  { category: 'sightseeing',   amount: 310,  budget: 400  },
  { category: 'experience',    amount: 540,  budget: 500  },
  { category: 'shopping',      amount: 180,  budget: 300  },
];

export default function BudgetPage() {
  const { id } = useParams();
  const { currentTrip: trip, fetchTrip, loading } = useTripStore();
  const [breakdown, setBreakdown] = useState(DEFAULT_BREAKDOWN);

  useEffect(() => {
    if (id) fetchTrip(id);
  }, [fetchTrip, id]);

  // Calculate totals from trip activities if available
  useEffect(() => {
    if (trip?.days?.length) {
      const activityCosts = {};
      trip.days.forEach(day => {
        day.activities?.forEach(act => {
          const cat = act.type || 'sightseeing';
          activityCosts[cat] = (activityCosts[cat] || 0) + (act.cost || 0);
        });
      });

      if (Object.keys(activityCosts).length > 0) {
        const updated = DEFAULT_BREAKDOWN.map(item => ({
          ...item,
          amount: Math.round((activityCosts[item.category] || item.amount * 0.3) + item.amount * 0.5),
        }));
        setBreakdown(updated);
      }
    }
  }, [trip]);

  if (loading) return <Loader />;

  const totalSpent   = breakdown.reduce((s, i) => s + i.amount, 0);
  const totalBudget  = trip?.budget || breakdown.reduce((s, i) => s + i.budget, 0);
  const overBudget   = totalSpent > totalBudget;
  const pct          = Math.min(100, Math.round((totalSpent / totalBudget) * 100));
  const days         = trip?.days?.length || 7;
  const avgPerDay    = Math.round(totalSpent / days);

  const pieData = breakdown.map(item => ({
    name: CATEGORY_CONFIG[item.category]?.label || item.category,
    value: item.amount,
    color: CATEGORY_CONFIG[item.category]?.color || '#ccc',
  }));

  const barData = breakdown.map(item => ({
    name: CATEGORY_CONFIG[item.category]?.label?.split(' ')[0] || item.category,
    Spent: item.amount,
    Budget: item.budget,
  }));

  const tripName = trip?.name || 'Your Trip';
  const currency = trip?.currency || '$';

  return (
    <div style={{ maxWidth: 'var(--max-w)', margin: '0 auto', padding: '40px 48px' }}>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <Link
          to={id ? `/trips/${id}` : '/trips'}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)', textDecoration: 'none', fontSize: 14, fontWeight: 500, marginBottom: 20 }}
        >
          <ArrowLeft size={16} /> Back to Trip
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 700, color: 'var(--text-main)', marginBottom: 6 }}>
              Budget Overview
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>{tripName}</p>
          </div>
          {overBudget ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FEF2F2', color: '#DC2626', padding: '10px 18px', borderRadius: 'var(--r-full)', fontSize: 14, fontWeight: 600 }}>
              <AlertTriangle size={16} /> Over Budget
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F0FDF4', color: '#16A34A', padding: '10px 18px', borderRadius: 'var(--r-full)', fontSize: 14, fontWeight: 600 }}>
              <CheckCircle size={16} /> On Track
            </div>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 40 }}>
        {[
          { label: 'Total Spent',       value: `${currency}${totalSpent.toLocaleString()}`,  icon: DollarSign,   color: 'var(--primary)' },
          { label: 'Total Budget',      value: `${currency}${totalBudget.toLocaleString()}`, icon: TrendingUp,   color: 'var(--secondary)' },
          { label: 'Avg. Per Day',      value: `${currency}${avgPerDay}`,                    icon: CheckCircle,  color: '#8B5CF6' },
        ].map(card => (
          <div key={card.label} style={{ background: '#fff', padding: 28, borderRadius: 'var(--r-2xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>{card.label}</span>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--r-lg)', background: card.color + '15', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <card.icon size={18} color={card.color} />
              </div>
            </div>
            <div style={{ fontSize: 30, fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-serif)' }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* Overall Progress Bar */}
      <div style={{ background: '#fff', padding: 32, borderRadius: 'var(--r-2xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', marginBottom: 32 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-main)' }}>Overall Budget Used</span>
          <span style={{ fontSize: 15, fontWeight: 700, color: overBudget ? '#DC2626' : 'var(--secondary)' }}>{pct}%</span>
        </div>
        <div style={{ height: 14, background: 'var(--surface-high)', borderRadius: 'var(--r-full)', overflow: 'hidden', marginBottom: 10 }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            borderRadius: 'var(--r-full)',
            background: overBudget
              ? 'linear-gradient(to right, #EF4444, #DC2626)'
              : 'linear-gradient(to right, var(--primary), var(--secondary))',
            transition: 'width 0.6s ease',
          }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)' }}>
          <span>{currency}0</span>
          <span>{currency}{totalBudget.toLocaleString()} total</span>
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 24, marginBottom: 32 }}>

        {/* Pie Chart */}
        <div style={{ background: '#fff', padding: 32, borderRadius: 'var(--r-2xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-main)', marginBottom: 24 }}>Spending by Category</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                {pieData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v) => `${currency}${v}`} />
              <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div style={{ background: '#fff', padding: 32, borderRadius: 'var(--r-2xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-main)', marginBottom: 24 }}>Spent vs. Budget by Category</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={barData} barSize={18}>
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} tickFormatter={v => `${currency}${v}`} />
              <Tooltip formatter={(v) => `${currency}${v}`} />
              <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Spent" fill="#FF5A5F" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Budget" fill="#E5E7EB" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Breakdown Table */}
      <div style={{ background: '#fff', borderRadius: 'var(--r-2xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)' }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-main)' }}>Category Breakdown</h3>
        </div>
        {breakdown.map((item, i) => {
          const cfg = CATEGORY_CONFIG[item.category] || {};
          const Icon = cfg.icon || DollarSign;
          const itemPct = Math.min(100, Math.round((item.amount / item.budget) * 100));
          const over = item.amount > item.budget;
          return (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr 2fr',
                alignItems: 'center',
                gap: 24,
                padding: '20px 32px',
                borderBottom: i < breakdown.length - 1 ? '1px solid var(--border)' : 'none',
              }}
            >
              {/* Category */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 'var(--r-lg)', background: (cfg.color || '#ccc') + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={18} color={cfg.color || '#ccc'} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-main)' }}>{cfg.label || item.category}</div>
                </div>
              </div>
              {/* Spent */}
              <div style={{ fontWeight: 700, fontSize: 15, color: over ? '#DC2626' : 'var(--text-main)' }}>
                {currency}{item.amount}
              </div>
              {/* Budget */}
              <div style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
                of {currency}{item.budget}
              </div>
              {/* Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{itemPct}% used</span>
                  {over && <span style={{ fontSize: 12, color: '#DC2626', fontWeight: 600 }}>Over by {currency}{item.amount - item.budget}</span>}
                </div>
                <div style={{ height: 8, background: 'var(--surface-high)', borderRadius: 'var(--r-full)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${itemPct}%`,
                    background: over ? '#EF4444' : cfg.color || 'var(--primary)',
                    borderRadius: 'var(--r-full)',
                  }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
