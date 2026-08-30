// src/components/DiaryCard.jsx
import React from 'react';

const DiaryCard = ({ post, onEdit, onDelete }) => {
  return (
    <div className="diary-card">
      <h2 className="diary-title">{post.dairyFaced}</h2>
      
      <div className="diary-tags">
        <span className="tag faced-tag">Faced</span>
        <span className="tag content-tag">{post.dairyFaced}</span>
      </div>
      
      {post.dairyImprovements && (
        <div className="diary-tags">
          <span className="tag improvements-tag">Improvements</span>
          <span className="tag content-tag">{post.dairyImprovements}</span>
        </div>
      )}
      
      <p className="diary-learned">
        {post.dairyLearned}
      </p>
      
      <div className="diary-actions">
        <button className="action-button edit-button" onClick={onEdit}>
          Edit
        </button>
        <button className="action-button delete-button" onClick={onDelete}>
          Delete
        </button>
        <div className="diary-checkboxes">
          <label className="checkbox-label">
            <input type="checkbox" className="checkbox" />
            <span className="checkmark"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default DiaryCard;