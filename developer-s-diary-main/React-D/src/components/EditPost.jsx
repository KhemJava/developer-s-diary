// src/components/EditPost.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getPostById, updatePost } from '../services/api';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dairyId: '',
    dairyFaced: '',
    dairyLearned: '',
    dairyImprovements: '',
    dairyTomorrowPlan: '',
    dairyDescription: ''
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getPostById(id);
        setFormData(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch post details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.dairyFaced || !formData.dairyLearned) {
      setError('Please fill in all required fields (Faced, Learned)');
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      await updatePost(formData);
      setSuccess(true);
      
      // Redirect after short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (err) {
      setError('Failed to update diary entry. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading entry details...</div>;
  }

  return (
    <div className="form-container">
      <h1 className="form-title">Edit Diary Entry</h1>
      
      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">
          <div className="success-animation">
            <div className="checkmark-circle"></div>
            <div className="checkmark-stem"></div>
            <div className="checkmark-kick"></div>
          </div>
          Updated successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="diary-form">
        <div className="form-group">
          <label htmlFor="dairyId">Entry ID (Read-only)</label>
          <input
            type="number"
            id="dairyId"
            name="dairyId"
            value={formData.dairyId}
            readOnly
            className="read-only"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dairyFaced">Problem Faced*</label>
          <input
            type="text"
            id="dairyFaced"
            name="dairyFaced"
            value={formData.dairyFaced}
            onChange={handleChange}
            placeholder="What problem did you face today?"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dairyLearned">What You Learned*</label>
          <textarea
            id="dairyLearned"
            name="dairyLearned"
            value={formData.dairyLearned}
            onChange={handleChange}
            placeholder="What did you learn from this experience?"
            required
            rows="4"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dairyImprovements">Areas for Improvement</label>
          <textarea
            id="dairyImprovements"
            name="dairyImprovements"
            value={formData.dairyImprovements}
            onChange={handleChange}
            placeholder="What could be improved?"
            rows="3"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dairyTomorrowPlan">Tomorrow's Plan</label>
          <textarea
            id="dairyTomorrowPlan"
            name="dairyTomorrowPlan"
            value={formData.dairyTomorrowPlan}
            onChange={handleChange}
            placeholder="What's your plan for tomorrow?"
            rows="3"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="dairyDescription">Additional Notes</label>
          <textarea
            id="dairyDescription"
            name="dairyDescription"
            value={formData.dairyDescription}
            onChange={handleChange}
            placeholder="Any additional notes or description"
            rows="3"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit" className="primary-button" disabled={submitting}>
            {submitting ? 'Updating...' : 'Update Entry'}
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
    </div>
  );
};

export default EditPost;