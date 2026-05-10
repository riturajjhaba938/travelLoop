import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { login } from '../api/auth.api';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/common/ErrorMessage';
import { getPhotoUrl, handleImgError } from '../utils/images';

const PANEL_IMG = getPhotoUrl('panel_kyoto', 1200);

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();
  const { login: loginCtx } = useAuth();

  const formik = useFormik({
    initialValues: { email: 'elena@example.com', password: 'password123' },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      setApiError('');
      try {
        const { user, token } = await login(values);
        loginCtx(user, token);
        toast.success('Welcome back!');
        navigate('/dashboard');
      } catch (err) {
        setApiError(err.message || 'Login failed');
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
            Welcome back
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', marginBottom: 32, fontSize: 15 }}>
            Enter your details to access your account.
          </p>

          {/* Test credentials hint */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255,90,95,0.06) 0%, rgba(252,100,45,0.06) 100%)',
            padding: '12px 16px', borderRadius: 'var(--r-lg)',
            border: '1px dashed rgba(255,90,95,0.3)',
            marginBottom: 28, fontSize: 13, color: 'var(--text-secondary)',
            fontFamily: 'var(--font-sans)',
          }}>
            <strong style={{ color: 'var(--primary)' }}>Test credentials:</strong><br />
            elena@example.com / password123
          </div>

          <ErrorMessage message={apiError} />

          <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
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
              {formik.touched.email && formik.errors.email && <div style={{ color: 'var(--error)', fontSize: 12, marginTop: 5, fontFamily: 'var(--font-sans)' }}>{formik.errors.email}</div>}
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--text-main)', marginBottom: 8, fontFamily: 'var(--font-sans)' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={17} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'} name="password" placeholder="••••••••"
                  onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}
                  style={{ ...inputStyle(formik.touched.password && formik.errors.password), paddingLeft: 44, paddingRight: 44 }}
                  onFocus={e => e.target.style.borderColor = 'var(--primary)'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}>
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              {formik.touched.password && formik.errors.password && <div style={{ color: 'var(--error)', fontSize: 12, marginTop: 5 }}>{formik.errors.password}</div>}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <a href="#" style={{ fontSize: 13, color: 'var(--primary)', fontWeight: 500, fontFamily: 'var(--font-sans)' }}>Forgot password?</a>
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
                transition: 'box-shadow 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--glow-primary)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
            >
              {formik.isSubmitting ? 'Signing in…' : 'Sign In'} {!formik.isSubmitting && <ArrowRight size={18} />}
            </motion.button>
          </form>

          <div style={{ marginTop: 32, textAlign: 'center', fontSize: 14, color: 'var(--text-secondary)', fontFamily: 'var(--font-sans)' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign up</Link>
          </div>
        </motion.div>
      </div>

      {/* ── Right: cinematic panel ── */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex' }}>
        <img
          src={PANEL_IMG} alt="Kyoto street morning"
          onError={handleImgError}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
        />
        {/* Gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 60%)' }} />
        {/* Bottom copy */}
        <div style={{ position: 'absolute', bottom: 60, left: 56, right: 56, color: '#fff' }}>
          <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: 16, fontFamily: 'var(--font-sans)' }}>
            TravelLoop
          </p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 42, fontWeight: 400, lineHeight: 1.15, marginBottom: 18 }}>
            Discover your next great adventure.
          </h2>
          <p style={{ fontSize: 16, opacity: 0.85, lineHeight: 1.7, fontFamily: 'var(--font-sans)', maxWidth: 420 }}>
            Join thousands of travelers who use TravelLoop to plan, organize, and share their incredible journeys around the world.
          </p>
        </div>
      </div>
    </div>
  );
}
