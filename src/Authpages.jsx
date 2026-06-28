import React, { useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Wordmark, Logo } from './Shared.jsx';
import { useAuth } from './App.jsx';

function AuthCard({ children }) {
  return (
    <div style={{
      minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center',
      justifyContent: 'center', padding: '2rem',
      background: 'radial-gradient(ellipse 70% 60% at 50% 40%, var(--sky-l) 0%, var(--sand) 70%)',
    }}>
      <div className="fade-up" style={{
        background: 'var(--white)', borderRadius: 20, border: '1px solid var(--sand-3)',
        padding: '2.5rem', width: '100%', maxWidth: 420, boxShadow: 'var(--sh-lg)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: '1.75rem' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10 }}>
            <Logo size={38} />
            <span style={{ fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: 26, letterSpacing: '-0.03em', lineHeight: 1, color: '#0D1E2D' }}>
              roam<span style={{ color: '#F4845F' }}>r</span>
            </span>
          </Link>
        </div>
        {children}
      </div>
    </div>
  );
}

export function LoginPage() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const emailRef = useRef('');

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current;
    const raw = email.split('@')[0].split(/[._\-+]/)[0];
    const firstName = raw.charAt(0).toUpperCase() + raw.slice(1).toLowerCase();
    handleLogin(firstName || 'Explorer', email);
    navigate(from, { replace: true });
  };

  return (
    <AuthCard>
      <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1.75rem', fontWeight: 400, color: 'var(--ink)', textAlign: 'center', marginBottom: 6, letterSpacing: '-.02em' }}>
        Welcome back
      </h2>
      <p style={{ textAlign: 'center', fontSize: '.9rem', color: 'var(--ink-3)', marginBottom: '2rem' }}>
        Sign in to access your saved trips.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Email Address</label>
          <input className="input" type="email" required placeholder="you@example.com"
            onChange={e => { emailRef.current = e.target.value; }} />
        </div>
        <div className="field" style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <label className="label" style={{ margin: 0 }}>Password</label>
            <span style={{ fontSize: '.8rem', color: 'var(--sky-mid)', cursor: 'pointer', fontWeight: 500 }}>Forgot?</span>
          </div>
          <input className="input" type="password" required placeholder="••••••••" />
        </div>
        <button type="submit" className="btn btn-primary btn-md" style={{ width: '100%', justifyContent: 'center' }}>
          Sign in →
        </button>
      </form>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '1.25rem 0' }}>
        <div style={{ flex: 1, height: 1, background: 'var(--sand-3)' }} />
        <span style={{ fontSize: '.8rem', color: 'var(--ink-3)' }}>or continue with</span>
        <div style={{ flex: 1, height: 1, background: 'var(--sand-3)' }} />
      </div>

      <button className="btn btn-sm" style={{ width: '100%', background: 'var(--sand)', border: '1.5px solid var(--sand-3)', color: 'var(--ink)', justifyContent: 'center', fontWeight: 500 }}>
        <span>🔍</span> Continue with Google
      </button>

      <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '.88rem', color: 'var(--ink-3)' }}>
        Don't have an account?{' '}
        <Link to="/signup" style={{ color: 'var(--sky-mid)', fontWeight: 600, textDecoration: 'none' }}>
          Create one free
        </Link>
      </p>
    </AuthCard>
  );
}

export function SignupPage() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const nameRef = useRef('');
  const emailRef = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const firstName = nameRef.current.trim().split(/\s+/)[0] || 'Explorer';
    const capitalized = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    handleLogin(capitalized, emailRef.current);
    navigate('/dashboard', { replace: true });
  };

  return (
    <AuthCard>
      <h2 style={{ fontFamily: "'DM Serif Display',serif", fontSize: '1.75rem', fontWeight: 400, color: 'var(--ink)', textAlign: 'center', marginBottom: 6, letterSpacing: '-.02em' }}>
        Start exploring
      </h2>
      <p style={{ textAlign: 'center', fontSize: '.9rem', color: 'var(--ink-3)', marginBottom: '2rem' }}>
        Create your free Roamr account.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Full Name</label>
          <input className="input" type="text" required placeholder="John Doe"
            onChange={e => { nameRef.current = e.target.value; }} />
        </div>
        <div className="field">
          <label className="label">Email Address</label>
          <input className="input" type="email" required placeholder="you@example.com"
            onChange={e => { emailRef.current = e.target.value; }} />
        </div>
        <div className="field" style={{ marginBottom: '1.5rem' }}>
          <label className="label">Password</label>
          <input className="input" type="password" required placeholder="Min. 8 characters" />
        </div>
        <button type="submit" className="btn btn-terra btn-md" style={{ width: '100%', justifyContent: 'center' }}>
          Create Free Account →
        </button>
      </form>

      <p style={{ textAlign: 'center', fontSize: '.78rem', color: 'var(--ink-3)', marginTop: '1rem', lineHeight: 1.6 }}>
        By signing up you agree to our{' '}
        <span style={{ color: 'var(--sky-mid)', cursor: 'pointer' }}>Terms of Service</span>
        {' '}and{' '}
        <span style={{ color: 'var(--sky-mid)', cursor: 'pointer' }}>Privacy Policy</span>.
      </p>

      <p style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '.88rem', color: 'var(--ink-3)' }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--sky-mid)', fontWeight: 600, textDecoration: 'none' }}>
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}