// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { email, password } = formData;
      if (!email || !password) throw new Error('Email and password are required');

      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (!user?.uid) throw new Error('Invalid user credentials');

      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) throw new Error('User profile not found in database');

      const profile = docSnap.data();
      const routeMap = { donor: '/donor-dashboard', ngo: '/ngo-dashboard', volunteer: '/volunteer' };
      navigate(routeMap[profile.user_type] || '/');
    } catch (error) {
      alert(error.message || 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  // Color palette
  const colors = {
    background: "hsla(160,5%,96%,1)",
    card: "hsla(0,0%,100%,0.8)",
    primary: "hsl(142,76%,36%)",
    primaryGradient: "linear-gradient(135deg, hsl(142,76%,36%), hsl(168,76%,42%))",
    primaryForeground: "hsl(0,0%,100%)",
    muted: "hsl(160,5%,45%)",
    inputBorder: "hsla(160,5%,45%,0.5)",
    accent: "hsla(168,76%,42%,0.05)",
    shadow: "0 10px 25px rgba(0,0,0,0.05)",
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '1rem',
        background: `linear-gradient(135deg, ${colors.background}, ${colors.accent})`,
      }}
    >
      {/* Animated background blobs */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div
          style={{
            position: 'absolute',
            top: '25%',
            left: '25%',
            width: '18rem',
            height: '18rem',
            background: `${colors.primary}20`,
            borderRadius: '9999px',
            filter: 'blur(6rem)',
            animation: 'pulse 6s infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '25%',
            right: '25%',
            width: '24rem',
            height: '24rem',
            background: `${colors.accent}`,
            borderRadius: '9999px',
            filter: 'blur(6rem)',
            animation: 'pulse 6s infinite',
            animationDelay: '1s',
          }}
        />
      </div>

      {/* Card container */}
      <div style={{ width: '100%', maxWidth: '28rem', position: 'relative', zIndex: 10 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '4rem',
              height: '4rem',
              borderRadius: '1rem',
              background: colors.primaryGradient,
              marginBottom: '1rem',
              boxShadow: colors.shadow,
            }}
          >
            <Sparkles style={{ width: '2rem', height: '2rem', color: colors.primaryForeground }} />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, background: colors.primaryGradient, WebkitBackgroundClip: 'text', color: 'transparent' }}>
            Food Rescue AI
          </h1>
          <p style={{ color: colors.muted, marginTop: '0.25rem' }}>Join the mission to reduce food waste</p>
        </div>

        {/* Form Card */}
        <div
          style={{
            backdropFilter: 'blur(10px)',
            backgroundColor: colors.card,
            borderRadius: '1rem',
            border: `1px solid ${colors.inputBorder}`,
            boxShadow: colors.shadow,
            overflow: 'hidden',
          }}
        >
          {/* Card Header */}
          <div style={{ padding: '1.5rem 1.5rem 0.75rem', textAlign: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>Welcome back</h2>
            <p style={{ color: colors.muted }}>Sign in to your account to continue making impact</p>
          </div>

          {/* Card Content / Form */}
          <div style={{ padding: '1.5rem' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Email */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label htmlFor="email" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Email address</label>
                <div style={{ position: 'relative' }}>
                  <Mail style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: colors.muted, width: '1rem', height: '1rem' }} />
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    style={{
                      paddingLeft: '2.5rem',
                      height: '3rem',
                      width: '100%',
                      borderRadius: '0.5rem',
                      border: `1px solid ${colors.inputBorder}`,
                      backgroundColor: 'hsla(0,0%,100%,0.5)',
                      color: colors.foreground,
                    }}
                  />
                </div>
              </div>

              {/* Password */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label htmlFor="password" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Password</label>
                <div style={{ position: 'relative' }}>
                  <Lock style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: colors.muted, width: '1rem', height: '1rem' }} />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleChange('password', e.target.value)}
                    required
                    style={{
                      paddingLeft: '2.5rem',
                      paddingRight: '2.5rem',
                      height: '3rem',
                      width: '100%',
                      borderRadius: '0.5rem',
                      border: `1px solid ${colors.inputBorder}`,
                      backgroundColor: 'hsla(0,0%,100%,0.5)',
                      color: colors.foreground,
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '0.75rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: colors.muted,
                    }}
                  >
                    {showPassword ? <EyeOff style={{ width: '1rem', height: '1rem' }} /> : <Eye style={{ width: '1rem', height: '1rem' }} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: '100%',
                  height: '3rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  background: colors.primaryGradient,
                  color: colors.primaryForeground,
                  fontWeight: 600,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s',
                }}
              >
                {isLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '1rem', height: '1rem', border: '2px solid hsla(0,0%,100%,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign in to dashboard</span>
                    <ArrowRight style={{ width: '1rem', height: '1rem' }} />
                  </>
                )}
              </button>

              {/* Signup link */}
              <p style={{ textAlign: 'center', color: colors.muted, fontSize: '0.875rem', marginTop: '1rem' }}>
                Don't have an account?{' '}
                <Link to="/signup" style={{ color: colors.primary, fontWeight: 500, textDecoration: 'none' }}>
                  Sign up for free
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
