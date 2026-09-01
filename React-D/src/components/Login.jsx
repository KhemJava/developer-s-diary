// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { resendVerification } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [resendEmail, setResendEmail] = useState('');
  const [resendStatus, setResendStatus] = useState(null);
  const [resending, setResending] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.password) {
      setError('Please enter your username and password');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setNeedsVerification(false);
      await login(formData.username, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
      setNeedsVerification(err.code === 'EMAIL_NOT_VERIFIED');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    if (!resendEmail) return;
    try {
      setResending(true);
      setResendStatus(null);
      const data = await resendVerification(resendEmail);
      setResendStatus(data.message || 'Verification email sent.');
    } catch (err) {
      setResendStatus(err.message || 'Could not resend the email.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Log In</h1>

      {error && <div className="error-message">{error}</div>}

      {needsVerification && (
        <form onSubmit={handleResend} className="resend-verification-box">
          <p>Didn't get the email?</p>
          <div className="resend-row">
            <input
              type="email"
              placeholder="Enter your email"
              value={resendEmail}
              onChange={(e) => setResendEmail(e.target.value)}
              required
            />
            <button type="submit" className="secondary-button" disabled={resending}>
              {resending ? 'Sending...' : 'Resend email'}
            </button>
          </div>
          {resendStatus && <p className="resend-status">{resendStatus}</p>}
        </form>
      )}

      <form onSubmit={handleSubmit} className="diary-form">
        <div className="form-group">
          <label htmlFor="username">Username*</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            autoComplete="username"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password*</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="form-footer">
        Don't have an account? <Link to="/register">Create one</Link>
      </div>
    </div>
  );
};

export default Login;
