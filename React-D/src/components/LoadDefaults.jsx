// src/components/LoadDefaults.jsx
import React from 'react';

const LoadDefaults = ({ onLoadDefaults }) => {
  return (
    <div className="load-defaults-container">
      <button className="secondary-button" onClick={onLoadDefaults}>
        Load Defaults
      </button>
    </div>
  );
};

export default LoadDefaults;