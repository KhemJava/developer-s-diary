// src/components/AddPost.jsx
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../services/api';

const FIELD_META = {
  dairyFaced: {
    label: 'Problem Faced',
    required: true,
    placeholder: 'What problem did you face today?',
    type: 'input',
    accent: '#e67e22',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3l1.9 4.6L18.5 9l-3.9 3.2L15.8 17 12 14.4 8.2 17l1.2-4.8L5.5 9l4.6-1.4L12 3z"
          stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    ),
  },
  dairyLearned: {
    label: 'What You Learned',
    required: true,
    placeholder: 'What did you learn from this experience?',
    type: 'textarea',
    rows: 4,
    accent: '#27ae60',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a6 6 0 00-3 11.2V15a1 1 0 001 1h4a1 1 0 001-1v-1.8A6 6 0 0012 2z"
          stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M10 19h4M11 22h2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  dairyImprovements: {
    label: 'Areas for Improvement',
    required: false,
    placeholder: 'What could be improved?',
    type: 'textarea',
    rows: 3,
    accent: '#3498db',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  dairyTomorrowPlan: {
    label: "Tomorrow's Plan",
    required: false,
    placeholder: "What's your plan for tomorrow?",
    type: 'textarea',
    rows: 3,
    accent: '#9b59b6',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1"
          stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  dairyDescription: {
    label: 'Additional Notes',
    required: false,
    placeholder: 'Any additional notes or description',
    type: 'textarea',
    rows: 3,
    accent: '#16a085',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 4h14v13l-4 3H5V4z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M8 8h8M8 11.5h8M8 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
};

const FIELD_ORDER = [
  'dairyFaced',
  'dairyLearned',
  'dairyImprovements',
  'dairyTomorrowPlan',
  'dairyDescription',
];

const HeroIllustration = () => (
  <svg className="hero-illustration" viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="160" cy="178" rx="120" ry="12" fill="rgba(0,0,0,0.08)" />
    <g className="hero-book">
      <path d="M40 150 L40 45 Q100 25 158 45 L158 150 Q100 132 40 150 Z" fill="#ffffff" stroke="#2c3e50" strokeWidth="2" />
      <path d="M280 150 L280 45 Q220 25 162 45 L162 150 Q220 132 280 150 Z" fill="#ffffff" stroke="#2c3e50" strokeWidth="2" />
      <path d="M158 45 Q160 44 162 45 L162 150 Q160 151 158 150 Z" fill="#eef2f5" />
      <g stroke="#dbe4ea" strokeWidth="2">
        <path d="M56 60 L142 46" /><path d="M56 76 L142 62" /><path d="M56 92 L142 78" /><path d="M56 108 L120 96" />
        <path d="M178 46 L264 60" /><path d="M178 62 L264 76" /><path d="M178 78 L264 92" /><path d="M200 96 L264 108" />
      </g>
    </g>
    <g className="hero-pen">
      <path d="M210 120 L250 78 L262 90 L222 132 Z" fill="#3498db" stroke="#2c3e50" strokeWidth="2" strokeLinejoin="round" />
      <path d="M250 78 L262 90" stroke="#2c3e50" strokeWidth="2" />
      <path d="M208 134 L212 120 L222 130 Z" fill="#2c3e50" />
    </g>
    <g className="hero-sparkle hero-sparkle-1">
      <path d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z" fill="#f1c40f" transform="translate(90,30)" />
    </g>
    <g className="hero-sparkle hero-sparkle-2">
      <path d="M0 -6 L1.5 -1.5 L6 0 L1.5 1.5 L0 6 L-1.5 1.5 L-6 0 L-1.5 -1.5 Z" fill="#e74c3c" transform="translate(250,150)" />
    </g>
    <g className="hero-sparkle hero-sparkle-3">
      <path d="M0 -5 L1.2 -1.2 L5 0 L1.2 1.2 L0 5 L-1.2 1.2 L-5 0 L-1.2 -1.2 Z" fill="#1abc9c" transform="translate(38,100)" />
    </g>
  </svg>
);

const Confetti = () => {
  const pieces = useMemo(
    () =>
      Array.from({ length: 24 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.4,
        duration: 1.4 + Math.random() * 1.2,
        rotate: Math.random() * 360,
        color: ['#3498db', '#27ae60', '#f1c40f', '#e74c3c', '#9b59b6'][i % 5],
      })),
    []
  );

  return (
    <div className="confetti-layer" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            backgroundColor: p.color,
            transform: `rotate(${p.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
};

const AddPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dairyFaced: '',
    dairyLearned: '',
    dairyImprovements: '',
    dairyTomorrowPlan: '',
    dairyDescription: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const filledCount = FIELD_ORDER.filter((key) => formData[key].trim().length > 0).length;
  const progressPct = Math.round((filledCount / FIELD_ORDER.length) * 100);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.dairyFaced || !formData.dairyLearned) {
      setError('Please fill in all required fields (Faced, Learned)');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      // The entry's ID and owner are assigned by the server based on the
      // logged-in user - the client never sends either.
      await addPost(formData);
      setSuccess(true);

      // Reset form
      setFormData({
        dairyFaced: '',
        dairyLearned: '',
        dairyImprovements: '',
        dairyTomorrowPlan: '',
        dairyDescription: '',
      });

      // Redirect after short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2200);
    } catch (err) {
      setError('Failed to add diary entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="add-entry-page">
        <div className="entry-success-screen">
          <Confetti />
          <div className="big-checkmark">
            <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
              <circle className="big-checkmark-circle" cx="40" cy="40" r="36" fill="none" stroke="#27ae60" strokeWidth="4" />
              <path className="big-checkmark-tick" d="M24 41 L35 52 L57 28" fill="none" stroke="#27ae60" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2>Entry added!</h2>
          <p>Heading back to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="add-entry-page">
      <div className="entry-hero">
        <HeroIllustration />
        <div className="entry-hero-text">
          <h1>Capture Today's Journey</h1>
          <p>A few honest notes now save you hours of context-switching later.</p>
        </div>
      </div>

      <div className="entry-progress-track">
        <div className="entry-progress-fill" style={{ width: `${progressPct}%` }} />
      </div>
      <div className="entry-progress-label">{filledCount} / {FIELD_ORDER.length} sections filled</div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="diary-form entry-form-grid">
        {FIELD_ORDER.map((key, index) => {
          const meta = FIELD_META[key];
          const value = formData[key];
          return (
            <div
              className={`field-card ${value ? 'field-card-filled' : ''}`}
              key={key}
              style={{ '--accent': meta.accent, animationDelay: `${index * 0.06}s` }}
            >
              <div className="field-card-header">
                <span className="field-icon">{meta.icon}</span>
                <label htmlFor={key}>
                  {meta.label}{meta.required && <span className="required-star">*</span>}
                </label>
              </div>

              {meta.type === 'input' ? (
                <input
                  type="text"
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={meta.placeholder}
                  required={meta.required}
                />
              ) : (
                <textarea
                  id={key}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  placeholder={meta.placeholder}
                  required={meta.required}
                  rows={meta.rows}
                />
              )}

              <div className="field-card-footer">
                <span className="char-count">{value.length} characters</span>
                {value && <span className="field-check">✓</span>}
              </div>
            </div>
          );
        })}

        <div className="form-actions entry-form-actions">
          <button type="submit" className="primary-button entry-submit-button" disabled={loading}>
            {loading ? (
              <span className="button-spinner" />
            ) : (
              <>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
                Add Entry
              </>
            )}
          </button>
          <button
            type="button"
            className="secondary-button"
            onClick={() => navigate('/dashboard')}
          >
            Cancel
          </button>
        </div>
      </form>

      <div className="form-footer">
        <button
          className="text-button"
          onClick={() => navigate('/dashboard')}
        >
          View Your Diary
        </button>
      </div>
    </div>
  );
};

export default AddPost;
