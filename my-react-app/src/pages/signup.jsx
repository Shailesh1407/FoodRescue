// src/pages/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Building, Phone, MapPin, Sparkles } from 'lucide-react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    phone: '',
    address: '',
    user_type: 'donor',
    organization_name: '',
  });

  const navigate = useNavigate();

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!formData.full_name || !formData.email || !formData.password) throw new Error("Name, email, and password are required");
      if (formData.user_type === 'ngo' && !formData.organization_name) throw new Error("Organization name is required for NGOs");

      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: formData.full_name });

      const userData = {
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone || '',
        address: formData.address || '',
        user_type: formData.user_type,
        organization_name: formData.user_type === 'ngo' ? formData.organization_name : '',
        createdAt: serverTimestamp()
      };

      await setDoc(doc(db, 'users', user.uid), userData);
      navigate('/login');
    } catch (error) {
      alert(error.message || "Something went wrong during signup");
    } finally {
      setIsLoading(false);
    }
  };

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
      <div style={{ width: '100%', maxWidth: '40rem', position: 'relative', zIndex: 10 }}>
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

        {/* Card / Form */}
        <div
          style={{
            backdropFilter: 'blur(10px)',
            backgroundColor: colors.card,
            borderRadius: '1rem',
            border: `1px solid ${colors.inputBorder}`,
            boxShadow: colors.shadow,
            overflow: 'hidden',
            padding: '1.5rem',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '0.25rem' }}>Create your account</h2>
            <p style={{ color: colors.muted }}>Choose your role and start making impact today</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* User Type */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>I want to join as</label>
              <select
                value={formData.user_type}
                onChange={e => handleChange('user_type', e.target.value)}
                style={{
                  height: '3rem',
                  borderRadius: '0.5rem',
                  border: `1px solid ${colors.inputBorder}`,
                  backgroundColor: 'hsla(0,0%,100%,0.5)',
                  padding: '0 0.75rem',
                  fontSize: '1rem',
                }}
              >
                <option value="donor">Food Donor</option>
                <option value="ngo">NGO</option>
                <option value="volunteer">Volunteer</option>
              </select>
            </div>

            {/* Name & Email */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {/** Full Name */}
              <div style={{ flex: '1 1 45%', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: colors.muted, width: '1rem', height: '1rem' }} />
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.full_name}
                    onChange={e => handleChange('full_name', e.target.value)}
                    required
                    style={{
                      width: '100%',
                      height: '3rem',
                      paddingLeft: '2.5rem',
                      borderRadius: '0.5rem',
                      border: `1px solid ${colors.inputBorder}`,
                      backgroundColor: 'hsla(0,0%,100%,0.5)',
                    }}
                  />
                </div>
              </div>

              {/** Email */}
              <div style={{ flex: '1 1 45%', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Email</label>
                <div style={{ position: 'relative' }}>
                  <Mail style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: colors.muted, width: '1rem', height: '1rem' }} />
                  <input
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={e => handleChange('email', e.target.value)}
                    required
                    style={{
                      width: '100%',
                      height: '3rem',
                      paddingLeft: '2.5rem',
                      borderRadius: '0.5rem',
                      border: `1px solid ${colors.inputBorder}`,
                      backgroundColor: 'hsla(0,0%,100%,0.5)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* NGO organization */}
            {formData.user_type === 'ngo' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Organization Name</label>
                <div style={{ position: 'relative' }}>
                  <Building style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: colors.muted, width: '1rem', height: '1rem' }} />
                  <input
                    type="text"
                    placeholder="Organization Name"
                    value={formData.organization_name}
                    onChange={e => handleChange('organization_name', e.target.value)}
                    required
                    style={{
                      width: '100%',
                      height: '3rem',
                      paddingLeft: '2.5rem',
                      borderRadius: '0.5rem',
                      border: `1px solid ${colors.inputBorder}`,
                      backgroundColor: 'hsla(0,0%,100%,0.5)',
                    }}
                  />
                </div>
              </div>
            )}

            {/* Phone & Address */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {/** Phone */}
              <div style={{ flex: '1 1 45%', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Phone</label>
                <div style={{ position: 'relative' }}>
                  <Phone style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: colors.muted, width: '1rem', height: '1rem' }} />
                  <input
                    type="tel"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={e => handleChange('phone', e.target.value)}
                    style={{
                      width: '100%',
                      height: '3rem',
                      paddingLeft: '2.5rem',
                      borderRadius: '0.5rem',
                      border: `1px solid ${colors.inputBorder}`,
                      backgroundColor: 'hsla(0,0%,100%,0.5)',
                    }}
                  />
                </div>
              </div>

              {/** Address */}
              <div style={{ flex: '1 1 45%', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Address</label>
                <div style={{ position: 'relative' }}>
                  <MapPin style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: colors.muted, width: '1rem', height: '1rem' }} />
                  <input
                    type="text"
                    placeholder="Address"
                    value={formData.address}
                    onChange={e => handleChange('address', e.target.value)}
                    style={{
                      width: '100%',
                      height: '3rem',
                      paddingLeft: '2.5rem',
                      borderRadius: '0.5rem',
                      border: `1px solid ${colors.inputBorder}`,
                      backgroundColor: 'hsla(0,0%,100%,0.5)',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Password */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: colors.muted, width: '1rem', height: '1rem' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={formData.password}
                  onChange={e => handleChange('password', e.target.value)}
                  required
                  style={{
                    width: '100%',
                    height: '3rem',
                    paddingLeft: '2.5rem',
                    paddingRight: '2.5rem',
                    borderRadius: '0.5rem',
                    border: `1px solid ${colors.inputBorder}`,
                    backgroundColor: 'hsla(0,0%,100%,0.5)',
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

            {/* Terms */}
            <div style={{ display: 'flex', alignItems: 'start', gap: '0.5rem', fontSize: '0.875rem' }}>
              <input type="checkbox" required style={{ borderRadius: '0.25rem', border: `1px solid ${colors.inputBorder}`, marginTop: '0.25rem' }} />
              <span style={{ color: colors.muted }}>
                I agree to the <Link to="/terms" style={{ color: colors.primary }}>Terms</Link> and <Link to="/privacy" style={{ color: colors.primary }}>Privacy Policy</Link>
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                height: '3rem',
                borderRadius: '0.5rem',
                background: colors.primaryGradient,
                color: colors.primaryForeground,
                fontWeight: 600,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
              }}
            >
              {isLoading ? <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><div style={{ width: '1rem', height: '1rem', border: '2px solid rgba(255,255,255,0.3)', borderTop: '2px solid white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />Creating account...</div> : 'Create Account'}
            </button>

            <p style={{ textAlign: 'center', color: colors.muted, fontSize: '0.875rem', marginTop: '1rem' }}>
              Already have an account?{' '}
              <Link to="/login" style={{ color: colors.primary, fontWeight: 500, textDecoration: 'none' }}>Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
