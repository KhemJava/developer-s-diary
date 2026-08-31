// src/components/Home.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.svg';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, username, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="home-container">
      <h1 className="title">Developer's Diary</h1>
      <div className="logo-container">
        <img src={logo} alt="Developer's Diary Logo" className="logo" />
      </div>
      <h2 className="welcome-text">
        {isAuthenticated ? `Welcome back, ${username}` : 'Welcome to Developer\'s Diary'}
      </h2>
      <p className="description">Track your development journey, challenges, and learnings</p>

      {isAuthenticated ? (
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
          <button
            className="secondary-button"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div className="button-container">
          <button
            className="primary-button view-button"
            onClick={() => navigate('/login')}
          >
            Log In
          </button>
          <button
            className="primary-button add-button"
            onClick={() => navigate('/register')}
          >
            Create an Account
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
