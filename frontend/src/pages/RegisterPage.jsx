import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { register } from '../api/auth.api';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/common/ErrorMessage';
import { getPhotoUrl, handleImgError } from '../utils/images';

const PANEL_IMG = getPhotoUrl('panel_amalfi', 1200);

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const { login: loginCtx } = useAuth();

  const formik = useFormik({
    initialValues: { firstName: '', lastName: '', email: '', password: '' },
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().min(8, 'Must be at least 8 characters').required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setApiError('');
      try {
        const { user, token } = await register(values);
        loginCtx(user, token);
        toast.success('Account created successfully!');
        navigate('/');
      } catch (err) {
        setApiError(err.message || 'Registration failed');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const inputStyle = (hasErr) => ({
    width: '100%', padding: '13px 16px 13px 44px',
    borderRadius: 'var(--r-lg)', border: `1.5px solid ${hasErr ? 'var(--error)' : 'var(--border)'}`,
    outline: 'none', fontSize: 15, fontFamily: 'var(--font-sans)',
    background: 'var(--surface)', color: 'var(--text-main)',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  });

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#fafafa' }}>
      {/* ── Left: form panel ── */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 48px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ width: '100%', maxWidth: 440 }}
        >
          {/* Logo */}
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 52, textDecoration: 'none' }}>
            <img
              src="/logo-vertical.png"
              alt="TravelLoop"
              style={{ height: 72, width: 'auto', objectFit: 'contain' }}
            />
          </Link>

          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 400, color: 'var(--text-main)', marginBottom: 8, lineHeight: 1.2 }}>
            Create an account
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', marginBottom: 36, fontSize: 15 }}>
            Start planning your dream trip today.
          </p>

          <ErrorMessage message={apiError} />

          <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Name row */}
            <div style={{ display: 'flex', gap: 14 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-main)', marginBottom: 8, fontFamily: 'var(--font-sans)' }}>First Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={17} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  <input
                    type="text" name="firstName" placeholder="Elena"
                    onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName}
                    style={inputStyle(formik.touched.firstName && formik.errors.firstName)}
                    onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                  />
                </div>
                {formik.touched.firstName && formik.errors.firstName && <div style={{ color: 'var(--error)', fontSize: 12, marginTop: 5 }}>{formik.errors.firstName}</div>}
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-main)', marginBottom: 8, fontFamily: 'var(--font-sans)' }}>Last Name</label>
                <input
                  type="text" name="lastName" placeholder="Rodriguez"
                  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName}
                  style={{ ...inputStyle(formik.touched.lastName && formik.errors.lastName), paddingLeft: 16 }}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                />
                {formik.touched.lastName && formik.errors.lastName && <div style={{ color: 'var(--error)', fontSize: 12, marginTop: 5 }}>{formik.errors.lastName}</div>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-main)', marginBottom: 8, fontFamily: 'var(--font-sans)' }}>Email</label>
              <div style={{ position: 'relative' }}>
                <Mail size={17} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email" name="email" placeholder="elena@example.com"
                  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}
                  style={inputStyle(formik.touched.email && formik.errors.email)}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                />
              </div>
              {formik.touched.email && formik.errors.email && <div style={{ color: 'var(--error)', fontSize: 12, marginTop: 5 }}>{formik.errors.email}</div>}
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-main)', marginBottom: 8, fontFamily: 'var(--font-sans)' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={17} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'} name="password" placeholder="Min. 8 characters"
                  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
                  style={{ ...inputStyle(formik.touched.password && formik.errors.password), paddingRight: 44 }}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}>
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && <div style={{ color: 'var(--error)', fontSize: 12, marginTop: 5 }}>{formik.errors.password}</div>}
            </div>

            <motion.button
              type="submit" disabled={formik.isSubmitting}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              style={{
                background: 'var(--primary)', color: '#fff',
                padding: '14px', borderRadius: 'var(--r-lg)', border: 'none',
                fontSize: 15, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                opacity: formik.isSubmitting ? 0.7 : 1, fontFamily: 'var(--font-sans)',
                marginTop: 8,
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--glow-primary)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              {formik.isSubmitting ? 'Creating account…' : 'Create Account'} {!formik.isSubmitting && <ArrowRight size={18} />}
            </motion.button>
          </form>

          <div style={{ marginTop: 32, textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign in</Link>
          </div>
        </motion.div>
      </div>

      {/* ── Right: Amalfi Coast panel ── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <img
          src={PANEL_IMG} alt="Amalfi Coast"
          onError={handleImgError}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.1) 60%)' }} />
        <div style={{ position: 'absolute', bottom: 60, left: 56, right: 56, color: '#fff' }}>
          <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: 16, fontFamily: 'var(--font-sans)' }}>
            TravelLoop
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 42, fontWeight: 400, lineHeight: 1.15, marginBottom: 18 }}>
            Your journey begins here.
          </h2>
          <p style={{ fontSize: 16, opacity: 0.85, lineHeight: 1.7, fontFamily: 'var(--font-sans)', maxWidth: 420 }}>
            Design the perfect itinerary, manage your budget, and keep all your travel plans in one beautiful place.
          </p>
        </div>
      </div>
    </div>
  );
}
