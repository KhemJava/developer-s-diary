// src/components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.svg';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1 className="title">Developer's Diary</h1>
      <div className="logo-container">
        <img src={logo} alt="Developer's Diary Logo" className="logo" />
      </div>
      <h2 className="welcome-text">Welcome to Developer's Diary</h2>
      <p className="description">Track your development journey, challenges, and learnings</p>
      <div className="button-container">
        <button 
          className="primary-button view-button"
          onClick={() => navigate('/dashboard')}
        >
          View Your Diary
        </button>
        <button 
          className="primary-button add-button"
          onClick={() => navigate('/add')}
        >
          Add a Page
        </button>
      </div>
    </div>
  );
};

export default Home;