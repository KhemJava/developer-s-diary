// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPosts, deletePost, loadDefaults } from '../services/api';
import DiaryCard from './DiaryCard';
import SearchBar from './SearchBar';
import LoadDefaults from './LoadDefaults';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getAllPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch diary posts. Please try again later.');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this diary entry?')) {
      try {
        await deletePost(id);
        setPosts(posts.filter(post => post.dairyId !== id));
      } catch (err) {
        setError('Failed to delete post. Please try again.');
      }
    }
  };

  const handleLoadDefaults = async () => {
    try {
      const response = await loadDefaults();
      alert(response);
      fetchPosts();
    } catch (err) {
      setError('Failed to load default data. Please try again.');
    }
  };

  const handleSearchResults = (results) => {
    setPosts(results);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Developer's Diary</h1>
      <div className="dashboard-actions">
        <SearchBar onSearchResults={handleSearchResults} />
        <button className="primary-button add-button" onClick={() => navigate('/add')}>
          Add New Entry
        </button>
        <button className="secondary-button home-button" onClick={() => navigate('/')}>
          Home
        </button>
      </div>
      
      <LoadDefaults onLoadDefaults={handleLoadDefaults} />

      {loading && <div className="loading">Loading entries...</div>}
      {error && <div className="error-message">{error}</div>}
      
      <div className="diary-posts-container">
        {posts.length > 0 ? (
          posts.map(post => (
            <DiaryCard 
              key={post.dairyId}
              post={post}
              onEdit={() => handleEdit(post.dairyId)}
              onDelete={() => handleDelete(post.dairyId)}
            />
          ))
        ) : (
          <div className="no-entries">
            <div className="empty-state-icon">
              <img src="/diary-icon.png" alt="No entries" className="empty-state-img" />
            </div>
            <p>No entries yet. Start writing your journey</p>
            <button className="primary-button" onClick={() => navigate('/add')}>
              Add Your First Entry
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
