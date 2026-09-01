// src/components/VerifyEmail.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { verifyEmail, resendVerification } from '../services/api';

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');

  const [status, setStatus] = useState('verifying'); // verifying | success | error | expired
  const [message, setMessage] = useState('');
  const [resendEmail, setResendEmail] = useState('');
  const [resendStatus, setResendStatus] = useState(null);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('This verification link is missing a token.');
      return;
    }

    verifyEmail(token)
      .then((data) => {
        setStatus('success');
        setMessage(data.message || 'Email verified! You can now log in.');
      })
      .catch((err) => {
        setStatus(err.code === 'TOKEN_EXPIRED' ? 'expired' : 'error');
        setMessage(err.message || 'Verification failed.');
      });
  }, [token]);

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
    <div className="form-container verify-email-container">
      <h1 className="form-title">Email Verification</h1>

      {status === 'verifying' && (
        <div className="verify-status verifying">
          <div className="spinner" />
          <p>Verifying your email...</p>
        </div>
      )}

      {status === 'success' && (
        <div className="success-message">
          <div className="success-animation">
            <div className="checkmark-circle"></div>
            <div className="checkmark-stem"></div>
            <div className="checkmark-kick"></div>
          </div>
          {message}
        </div>
      )}

      {(status === 'error' || status === 'expired') && (
        <>
          <div className="error-message">{message}</div>
          <form onSubmit={handleResend} className="resend-verification-box">
            <p>Enter your email to get a new verification link:</p>
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
        </>
      )}

      <div className="form-footer">
        <button className="primary-button" onClick={() => navigate('/login')}>
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
