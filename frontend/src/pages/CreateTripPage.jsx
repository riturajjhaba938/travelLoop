import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Users, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import useTripStore from '../store/useTripStore';
import ErrorMessage from '../components/common/ErrorMessage';
import { searchCities } from '../api/cities.api';
import { getPhotoUrl, handleImgError } from '../utils/images';

const PANEL_IMG = getPhotoUrl('amalfi', 1200);

const inputStyle = (hasErr = false) => ({
  width: '100%', padding: '12px 16px',
  borderRadius: 'var(--r-lg)',
  border: `1.5px solid ${hasErr ? 'var(--error)' : 'var(--border)'}`,
  outline: 'none', fontSize: 15,
  fontFamily: 'var(--font-sans)',
  background: 'var(--surface)',
  color: 'var(--text-main)',
  transition: 'border-color 0.2s',
});

const labelStyle = {
  display: 'block', fontSize: 13, fontWeight: 600,
  color: 'var(--text-secondary)', marginBottom: 8,
  fontFamily: 'var(--font-sans)', letterSpacing: 0.3,
  textTransform: 'uppercase',
};

export default function CreateTripPage() {
  const navigate = useNavigate();
  const { createTrip } = useTripStore();
  const [cityQuery, setCityQuery] = useState('');
  const [cityResults, setCityResults] = useState([]);
  const [showCityResults, setShowCityResults] = useState(false);

  const formik = useFormik({
    initialValues: { name: '', destination: '', startDate: '', endDate: '', budget: '', travelers: 1, description: '' },
    validationSchema: Yup.object({
      name: Yup.string().required('Required'),
      destination: Yup.string().required('Required'),
      startDate: Yup.date().required('Required'),
      endDate: Yup.date().min(Yup.ref('startDate'), 'End date cannot be before start date').required('Required'),
      budget: Yup.number().positive().required('Required'),
      travelers: Yup.number().min(1).required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const trip = await createTrip({ ...values, budget: Number(values.budget), travelers: Number(values.travelers), currency: '$' });
        toast.success('Trip created!');
        navigate(`/trips/${trip.id}`);
      } catch {
        toast.error('Failed to create trip');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCitySearch = async (e) => {
    const q = e.target.value;
    setCityQuery(q);
    formik.setFieldValue('destination', q);
    if (q.length > 2) {
      const res = await searchCities(q);
      setCityResults(res);
      setShowCityResults(true);
    } else {
      setShowCityResults(false);
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - var(--nav-h))', display: 'flex' }}>
      {/* ── Left: Form ── */}
      <div style={{ flex: 1, padding: '56px 64px', overflowY: 'auto', maxWidth: 720 }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: 12 }}>
            New Adventure
          </p>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 42, fontWeight: 400, color: 'var(--text-main)', marginBottom: 8, lineHeight: 1.15 }}>
            Plan a New Trip
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', fontSize: 16, marginBottom: 40, lineHeight: 1.6 }}>
            Fill in the details below to start organizing your next adventure.
          </p>

          <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {/* Trip Name */}
            <div>
              <label style={labelStyle}>Trip Name</label>
              <input
                type="text" name="name" placeholder="e.g., Summer in Italy"
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}
                onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                onBlur2={e => e.target.style.borderColor = 'var(--border)'}
                style={inputStyle(formik.touched.name && formik.errors.name)}
              />
              {formik.touched.name && formik.errors.name && <div style={{ color: 'var(--error)', fontSize: 12, marginTop: 5, fontFamily: 'var(--font-sans)' }}>{formik.errors.name}</div>}
            </div>

            {/* Destination */}
            <div style={{ position: 'relative' }}>
              <label style={labelStyle}>Destination</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={17} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="text" placeholder="Where are you going?"
                  value={cityQuery} onChange={handleCitySearch}
                  onBlur={() => setTimeout(() => setShowCityResults(false), 200)}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  style={{ ...inputStyle(formik.touched.destination && formik.errors.destination), paddingLeft: 44 }}
                />
              </div>
              {formik.touched.destination && formik.errors.destination && <div style={{ color: 'var(--error)', fontSize: 12, marginTop: 5, fontFamily: 'var(--font-sans)' }}>{formik.errors.destination}</div>}
              {showCityResults && cityResults.length > 0 && (
                <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#fff', border: '1.5px solid var(--border)', borderRadius: 'var(--r-lg)', marginTop: 6, zIndex: 10, boxShadow: 'var(--shadow-lg)', maxHeight: 200, overflowY: 'auto' }}>
                  {cityResults.map(c => (
                    <div key={c} onClick={() => { setCityQuery(c); formik.setFieldValue('destination', c); setShowCityResults(false); }}
                      style={{ padding: '11px 16px', cursor: 'pointer', fontSize: 14, fontFamily: 'var(--font-sans)', borderBottom: '1px solid var(--border)', color: 'var(--text-main)', transition: 'background 0.1s' }}
                      onMouseEnter={e => e.target.style.background = 'var(--surface)'}
                      onMouseLeave={e => e.target.style.background = '#fff'}
                    >
                      <MapPin size={13} style={{ marginRight: 8, color: 'var(--primary)', verticalAlign: 'middle' }} />{c}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Dates */}
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Start Date</label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={17} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="date" name="startDate"
                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.startDate}
                    onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                    style={{ ...inputStyle(formik.touched.startDate && formik.errors.startDate), paddingLeft: 44 }} />
                </div>
                {formik.touched.startDate && formik.errors.startDate && <div style={{ color: 'var(--error)', fontSize: 12, marginTop: 5, fontFamily: 'var(--font-sans)' }}>{formik.errors.startDate}</div>}
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>End Date</label>
                <div style={{ position: 'relative' }}>
                  <Calendar size={17} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="date" name="endDate"
                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.endDate}
                    onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                    style={{ ...inputStyle(formik.touched.endDate && formik.errors.endDate), paddingLeft: 44 }} />
                </div>
                {formik.touched.endDate && formik.errors.endDate && <div style={{ color: 'var(--error)', fontSize: 12, marginTop: 5, fontFamily: 'var(--font-sans)' }}>{formik.errors.endDate}</div>}
              </div>
            </div>

            {/* Budget & Travelers */}
            <div style={{ display: 'flex', gap: 16 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Budget ($)</label>
                <div style={{ position: 'relative' }}>
                  <DollarSign size={17} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="number" name="budget" placeholder="0"
                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.budget}
                    onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                    style={{ ...inputStyle(formik.touched.budget && formik.errors.budget), paddingLeft: 44 }} />
                </div>
                {formik.touched.budget && formik.errors.budget && <div style={{ color: 'var(--error)', fontSize: 12, marginTop: 5, fontFamily: 'var(--font-sans)' }}>{formik.errors.budget}</div>}
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Travelers</label>
                <div style={{ position: 'relative' }}>
                  <Users size={17} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input type="number" name="travelers" min="1"
                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.travelers}
                    onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                    style={{ ...inputStyle(formik.touched.travelers && formik.errors.travelers), paddingLeft: 44 }} />
                </div>
                {formik.touched.travelers && formik.errors.travelers && <div style={{ color: 'var(--error)', fontSize: 12, marginTop: 5, fontFamily: 'var(--font-sans)' }}>{formik.errors.travelers}</div>}
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={labelStyle}>Description (Optional)</label>
              <textarea
                name="description" rows="3" placeholder="What's the main goal of this trip?"
                onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description}
                onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                style={{ ...inputStyle(), resize: 'vertical', paddingTop: 12 }}
              />
            </div>

            <motion.button
              type="submit" disabled={formik.isSubmitting}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              style={{
                background: 'var(--primary)', color: '#fff',
                padding: '15px', borderRadius: 'var(--r-lg)', border: 'none',
                fontSize: 15, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                opacity: formik.isSubmitting ? 0.7 : 1, fontFamily: 'var(--font-sans)',
                marginTop: 8, letterSpacing: 0.3,
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--glow-primary)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              {formik.isSubmitting ? 'Creating…' : 'Create Trip'} {!formik.isSubmitting && <ArrowRight size={18} />}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* ── Right: Amalfi panel (hidden on small screens) ── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', minHeight: 'calc(100vh - var(--nav-h))' }}>
        <img
          src={PANEL_IMG} alt="Amalfi Coast"
          onError={handleImgError}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.05) 65%)' }} />
        <div style={{ position: 'absolute', bottom: 60, left: 52, right: 52, color: '#fff' }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
            Every journey starts here
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 38, fontWeight: 400, lineHeight: 1.18, marginBottom: 16 }}>
            Craft your perfect adventure.
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 15, opacity: 0.85, lineHeight: 1.7, maxWidth: 380 }}>
            From budget tracking to day-by-day itineraries — TravelLoop keeps your plans beautifully organized.
          </p>
        </div>
      </div>
    </div>
  );
}
