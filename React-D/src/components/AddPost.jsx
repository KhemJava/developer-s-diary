// src/components/AddPost.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPost } from '../services/api';

const AddPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    dairyId: '',
    dairyFaced: '',
    dairyLearned: '',
    dairyImprovements: '',
    dairyTomorrowPlan: '',
    dairyDescription: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.dairyId || !formData.dairyFaced || !formData.dairyLearned) {
      setError('Please fill in all required fields (ID, Faced, Learned)');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      await addPost(formData);
      setSuccess(true);
      
      // Reset form
      setFormData({
        dairyId: '',
        dairyFaced: '',
        dairyLearned: '',
        dairyImprovements: '',
        dairyTomorrowPlan: '',
        dairyDescription: ''
      });
      
      // Redirect after short delay
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
      
    } catch (err) {
      setError('Failed to add diary entry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Add a New Diary Entry</h1>
      
      {error && <div className="error-message">{error}</div>}
      {success && (
        <div className="success-message">
          <div className="success-animation">
            <div className="checkmark-circle"></div>
            <div className="checkmark-stem"></div>
            <div className="checkmark-kick"></div>
          </div>
          Added successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="diary-form">
        <div className="form-group">
          <label htmlFor="dairyId">Entry ID*</label>
          <input
            type="number"
            id="dairyId"
            name="dairyId"
            value={formData.dairyId}
            onChange={handleChange}
            placeholder="Enter a unique ID number"
            required
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
          <button type="submit" className="primary-button" disabled={loading}>
            {loading ? 'Adding...' : 'Add Entry'}
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
