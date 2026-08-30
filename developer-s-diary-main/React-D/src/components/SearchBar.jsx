// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { searchPosts } from '../services/api';

const SearchBar = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      return;
    }
    
    try {
      setIsSearching(true);
      const results = await searchPosts(searchTerm);
      onSearchResults(results);
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={isSearching}>
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;