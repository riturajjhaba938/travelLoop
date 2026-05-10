import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, DollarSign, TrendingUp, AlertTriangle, CheckCircle,
  Utensils, Car, BedDouble, Camera, ShoppingBag, Zap, Plus, Trash2, X,
} from 'lucide-react';
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import toast from 'react-hot-toast';
import useTripStore from '../store/useTripStore';
import { getExpenses, addExpense, deleteExpense, getBudgetBreakdown, getBudgetSummary } from '../api/expenses.api';
import Loader from '../components/common/Loader';

/* ── Category config ─────────────────────────────────────────── */
const CATEGORY_CONFIG = {
  food:          { label: 'Dining & Food',  icon: Utensils,    color: '#FF5A5F' },
  dining:        { label: 'Dining & Food',  icon: Utensils,    color: '#FF5A5F' },
  transport:     { label: 'Transport',      icon: Car,         color: '#00A699' },
  accommodation: { label: 'Accommodation', icon: BedDouble,   color: '#FC642D' },
  sightseeing:   { label: 'Sightseeing',   icon: Camera,      color: '#8B5CF6' },
  experience:    { label: 'Experiences',   icon: Zap,         color: '#F59E0B' },
  shopping:      { label: 'Shopping',      icon: ShoppingBag, color: '#10B981' },
  other:         { label: 'Other',         icon: DollarSign,  color: '#6B7280' },
};

const CATEGORIES = Object.keys(CATEGORY_CONFIG).filter(k => k !== 'dining');

const inputSt = {
  width: '100%', padding: '10px 14px',
  border: '1.5px solid var(--border)',
  borderRadius: 'var(--r-lg)', fontSize: 14,
  fontFamily: 'var(--font-sans)', background: 'var(--surface)',
  color: 'var(--text-main)', outline: 'none',
};

/* ── Component ───────────────────────────────────────────────── */
export default function BudgetPage() {
  const { id } = useParams();
  const { currentTrip: trip, fetchTrip, loading: tripLoading } = useTripStore();

  const [expenses, setExpenses]     = useState([]);
  const [breakdown, setBreakdown]   = useState([]);   // { category, total } from server
  const [summary, setSummary]       = useState({ total_planned: 0, total_spent: 0 });
  const [loadingExp, setLoadingExp] = useState(true);
  const [showForm, setShowForm]     = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // New-expense form state
  const [form, setForm] = useState({
    category: 'food', description: '', qty: 1, unit: 'item', unit_cost: '',
  });

  /* ── Fetch trip + expenses ─────────────────────────────────── */
  const loadData = useCallback(async () => {
    if (!id) return;
    setLoadingExp(true);
    try {
      const [expData, bkData, summaryData] = await Promise.all([
        getExpenses(id),
        getBudgetBreakdown(id),
        getBudgetSummary(id),
      ]);
      setExpenses(expData);
      setBreakdown(bkData.by_category || []);
      setSummary(summaryData || { total_planned: 0, total_spent: 0 });
    } catch (err) {
      toast.error('Failed to load expense data');
    } finally {
      setLoadingExp(false);
    }
  }, [id]);

  useEffect(() => { if (id) fetchTrip(id); }, [fetchTrip, id]);
  useEffect(() => { loadData(); }, [loadData]);

  /* ── Derived numbers ───────────────────────────────────────── */
  const currency     = trip?.currency || '$';
  const tripBudget = parseFloat(trip?.budget || 0);
  const plannedFromSections = parseFloat(summary?.total_planned || 0);
  const totalBudget = plannedFromSections > 0 ? plannedFromSections : tripBudget;
  const totalSpent = parseFloat(summary?.total_spent || expenses.reduce((s, e) => s + parseFloat(e.amount || 0), 0));
  const remaining    = totalBudget - totalSpent;
  const overBudget   = totalSpent > totalBudget && totalBudget > 0;
  const rawPct       = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
  const pctForBar    = Math.min(100, Math.max(0, rawPct));
  const pctLabel     = `${pctForBar.toFixed(1)}%`;

  // Trip duration in days
  const tripDays = (() => {
    if (!trip?.start_date || !trip?.end_date) return 1;
    const diff = (new Date(trip.end_date) - new Date(trip.start_date)) / (1000 * 60 * 60 * 24);
    return Math.max(1, Math.round(diff));
  })();
  const avgPerDay = Math.round(totalSpent / tripDays);

  /* ── Chart data from real breakdown ───────────────────────── */
  const pieData = breakdown
    .filter(r => parseFloat(r.total) > 0)
    .map(r => {
      const key = r.category?.toLowerCase() || 'other';
      const cfg = CATEGORY_CONFIG[key] || CATEGORY_CONFIG.other;
      return { name: cfg.label, value: parseFloat(r.total), color: cfg.color };
    });

  const barData = breakdown
    .filter(r => parseFloat(r.total) > 0)
    .map(r => {
      const key = r.category?.toLowerCase() || 'other';
      const cfg = CATEGORY_CONFIG[key] || CATEGORY_CONFIG.other;
      // Category budget = proportional share of total trip budget
      const catBudget = totalBudget > 0
        ? Math.round((parseFloat(r.total) / totalSpent || 0) * totalBudget)
        : 0;
      return { name: cfg.label.split(' ')[0], Spent: parseFloat(r.total), Budget: catBudget };
    });

  /* ── Add expense ───────────────────────────────────────────── */
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.description.trim() || !form.unit_cost || !form.qty) {
      toast.error('Please fill in all fields'); return;
    }
    setSubmitting(true);
    try {
      await addExpense(id, {
        category:    form.category,
        description: form.description.trim(),
        qty:         Number(form.qty),
        unit:        form.unit || 'item',
        unit_cost:   Number(form.unit_cost),
      });
      toast.success('Expense added!');
      setForm({ category: 'food', description: '', qty: 1, unit: 'item', unit_cost: '' });
      setShowForm(false);
      loadData();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to add expense');
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Delete expense ────────────────────────────────────────── */
  const handleDelete = async (expId) => {
    try {
      await deleteExpense(expId);
      toast.success('Expense removed');
      loadData();
    } catch {
      toast.error('Failed to delete expense');
    }
  };

  if (tripLoading || loadingExp) return <Loader />;

  /* ── Render ────────────────────────────────────────────────── */
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
            <p style={{ color: 'var(--text-secondary)', fontSize: 16 }}>{trip?.name || 'Your Trip'}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {totalBudget > 0 && (
              overBudget ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#FEF2F2', color: '#DC2626', padding: '10px 18px', borderRadius: 'var(--r-full)', fontSize: 14, fontWeight: 600 }}>
                  <AlertTriangle size={16} /> Over Budget
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F0FDF4', color: '#16A34A', padding: '10px 18px', borderRadius: 'var(--r-full)', fontSize: 14, fontWeight: 600 }}>
                  <CheckCircle size={16} /> On Track
                </div>
              )
            )}
            <button
              onClick={() => setShowForm(v => !v)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'var(--primary)', color: '#fff',
                padding: '10px 20px', borderRadius: 'var(--r-full)',
                border: 'none', fontSize: 14, fontWeight: 600, cursor: 'pointer',
              }}
            >
              <Plus size={16} /> Add Expense
            </button>
          </div>
        </div>
      </div>

      {/* ── Add Expense Form ───────────────────────────────────── */}
      {showForm && (
        <div style={{
          background: '#fff', border: '1px solid var(--border)', borderRadius: 'var(--r-2xl)',
          padding: 32, marginBottom: 32, boxShadow: 'var(--shadow-sm)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-main)' }}>Add New Expense</h3>
            <button onClick={() => setShowForm(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
              <X size={20} />
            </button>
          </div>
          <form onSubmit={handleAdd}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
              {/* Category */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Category</label>
                <select
                  value={form.category}
                  onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                  style={{ ...inputSt }}
                >
                  {CATEGORIES.map(c => (
                    <option key={c} value={c}>{CATEGORY_CONFIG[c].label}</option>
                  ))}
                </select>
              </div>
              {/* Description */}
              <div style={{ gridColumn: 'span 2' }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Description</label>
                <input
                  type="text" placeholder="e.g. Hotel Amalfi 3 nights"
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  style={inputSt}
                />
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              {/* Qty */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Qty</label>
                <input
                  type="number" min="0.01" step="any" placeholder="1"
                  value={form.qty}
                  onChange={e => setForm(f => ({ ...f, qty: e.target.value }))}
                  style={inputSt}
                />
              </div>
              {/* Unit */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Unit</label>
                <input
                  type="text" placeholder="item / night / km"
                  value={form.unit}
                  onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}
                  style={inputSt}
                />
              </div>
              {/* Unit Cost */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Unit Cost ({currency})</label>
                <input
                  type="number" min="0" step="any" placeholder="0.00"
                  value={form.unit_cost}
                  onChange={e => setForm(f => ({ ...f, unit_cost: e.target.value }))}
                  style={inputSt}
                />
              </div>
              {/* Total Preview */}
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 0.5 }}>Total</label>
                <div style={{ ...inputSt, background: 'var(--surface-high)', color: 'var(--primary)', fontWeight: 700 }}>
                  {currency}{((Number(form.qty) || 0) * (Number(form.unit_cost) || 0)).toFixed(2)}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button type="button" onClick={() => setShowForm(false)}
                style={{ padding: '10px 20px', borderRadius: 'var(--r-lg)', border: '1.5px solid var(--border)', background: '#fff', color: 'var(--text-main)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                Cancel
              </button>
              <button type="submit" disabled={submitting}
                style={{ padding: '10px 24px', borderRadius: 'var(--r-lg)', border: 'none', background: 'var(--primary)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer', opacity: submitting ? 0.7 : 1 }}>
                {submitting ? 'Adding…' : 'Add Expense'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── Summary Cards ─────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 40 }}>
        {[
          { label: 'Total Spent',   value: `${currency}${totalSpent.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, icon: DollarSign,  color: 'var(--primary)' },
          { label: 'Total Budget',  value: totalBudget > 0 ? `${currency}${totalBudget.toLocaleString()}` : 'Not set', icon: TrendingUp,  color: 'var(--secondary)' },
          { label: 'Avg. Per Day',  value: `${currency}${avgPerDay.toLocaleString()}`,  icon: CheckCircle, color: '#8B5CF6' },
        ].map(card => (
          <div key={card.label} style={{ background: '#fff', padding: 28, borderRadius: 'var(--r-2xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <span style={{ fontSize: 14, color: 'var(--text-secondary)', fontWeight: 500 }}>{card.label}</span>
              <div style={{ width: 40, height: 40, borderRadius: 'var(--r-lg)', background: card.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <card.icon size={18} color={card.color} />
              </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-main)', fontFamily: 'var(--font-serif)' }}>{card.value}</div>
          </div>
        ))}
      </div>

      {/* ── Overall Progress Bar ───────────────────────────────── */}
      {totalBudget > 0 && (
        <div style={{ background: '#fff', padding: 32, borderRadius: 'var(--r-2xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', marginBottom: 32 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontWeight: 600, fontSize: 15, color: 'var(--text-main)' }}>Overall Budget Used</span>
            <span style={{ fontSize: 15, fontWeight: 700, color: overBudget ? '#DC2626' : 'var(--secondary)' }}>{pctLabel}</span>
          </div>
          <div style={{ height: 14, background: 'var(--surface-high)', borderRadius: 'var(--r-full)', overflow: 'hidden', marginBottom: 10 }}>
            <div style={{
              height: '100%', width: `${pctForBar}%`, borderRadius: 'var(--r-full)',
              background: overBudget
                ? 'linear-gradient(to right, #EF4444, #DC2626)'
                : 'linear-gradient(to right, var(--primary), var(--secondary))',
              transition: 'width 0.6s ease',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text-muted)' }}>
            <span>{currency}0</span>
            <span>{currency}{totalBudget.toLocaleString()} total budget</span>
          </div>
          {remaining !== 0 && (
            <div style={{ marginTop: 12, fontSize: 14, fontWeight: 600, color: remaining >= 0 ? '#16A34A' : '#DC2626' }}>
              {remaining >= 0
                ? `${currency}${remaining.toFixed(2)} remaining`
                : `${currency}${Math.abs(remaining).toFixed(2)} over budget`}
            </div>
          )}
        </div>
      )}

      {/* ── Charts (only when there are expenses) ─────────────── */}
      {pieData.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 24, marginBottom: 32 }}>
          {/* Pie */}
          <div style={{ background: '#fff', padding: 32, borderRadius: 'var(--r-2xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-main)', marginBottom: 24 }}>Spending by Category</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, idx) => <Cell key={idx} fill={entry.color} />)}
                </Pie>
                <Tooltip formatter={(v) => `${currency}${Number(v).toFixed(2)}`} />
                <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar */}
          <div style={{ background: '#fff', padding: 32, borderRadius: 'var(--r-2xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-main)', marginBottom: 24 }}>Spent by Category</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={barData} barSize={20}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#888' }} axisLine={false} tickLine={false} tickFormatter={v => `${currency}${v}`} />
                <Tooltip formatter={(v) => `${currency}${Number(v).toFixed(2)}`} />
                <Legend iconType="circle" iconSize={10} wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="Spent" fill="#FF5A5F" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ── Expense Transactions Table ─────────────────────────── */}
      <div style={{ background: '#fff', borderRadius: 'var(--r-2xl)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
        <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-main)' }}>
            All Expenses <span style={{ fontSize: 13, color: 'var(--text-muted)', fontWeight: 400, marginLeft: 8 }}>{expenses.length} items</span>
          </h3>
        </div>

        {expenses.length === 0 ? (
          <div style={{ padding: '64px 32px', textAlign: 'center' }}>
            <DollarSign size={40} style={{ color: 'var(--text-muted)', marginBottom: 16 }} />
            <p style={{ color: 'var(--text-secondary)', fontSize: 15, marginBottom: 8 }}>No expenses yet</p>
            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>Click "Add Expense" to track your spending</p>
          </div>
        ) : (
          <>
            {/* Table header */}
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 80px',
              padding: '12px 32px', background: 'var(--surface-high)',
              fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 0.5,
            }}>
              <span>Description</span><span>Category</span><span>Qty × Unit Cost</span><span style={{ textAlign: 'right' }}>Amount</span><span />
            </div>

            {expenses.map((exp, i) => {
              const key   = exp.category?.toLowerCase() || 'other';
              const cfg   = CATEGORY_CONFIG[key] || CATEGORY_CONFIG.other;
              const Icon  = cfg.icon;
              return (
                <div
                  key={exp.id}
                  style={{
                    display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 80px',
                    alignItems: 'center', gap: 8,
                    padding: '16px 32px',
                    borderBottom: i < expenses.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  {/* Description */}
                  <div style={{ fontWeight: 500, fontSize: 14, color: 'var(--text-main)' }}>
                    {exp.description || '—'}
                  </div>
                  {/* Category badge */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 'var(--r-lg)', background: cfg.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Icon size={14} color={cfg.color} />
                    </div>
                    <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{cfg.label}</span>
                  </div>
                  {/* Qty × unit cost */}
                  <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                    {Number(exp.qty)} {exp.unit} × {currency}{Number(exp.unit_cost).toFixed(2)}
                  </div>
                  {/* Amount */}
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-main)', textAlign: 'right' }}>
                    {currency}{Number(exp.amount).toFixed(2)}
                  </div>
                  {/* Delete */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button
                      onClick={() => handleDelete(exp.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 6, borderRadius: 'var(--r-lg)', display: 'flex', alignItems: 'center' }}
                      title="Remove expense"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}

            {/* Footer total */}
            <div style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 80px',
              padding: '16px 32px', borderTop: '2px solid var(--border)',
              background: 'var(--surface)',
            }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-main)', gridColumn: 'span 3' }}>Total</div>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--primary)', textAlign: 'right' }}>
                {currency}{totalSpent.toFixed(2)}
              </div>
              <div />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
