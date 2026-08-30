// src/services/api.js
const API_BASE_URL = 'http://localhost:8080';

const getToken = () => localStorage.getItem('token');

const authHeaders = () => {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// If the token is missing/expired the backend returns 401 - clear the stale
// session and send the user back to the login page instead of showing a
// confusing "failed to fetch" error.
const handleAuthFailure = (response) => {
  if (response.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }
};

export const registerUser = async (username, email, password) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Registration failed');
  }
  return data;
};

export const loginUser = async (username, password) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Invalid username or password');
  }
  return data; // { token, type, username, email }
};

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/dairyPosts`, {
      headers: { ...authHeaders() },
    });
    if (!response.ok) {
      handleAuthFailure(response);
      throw new Error('Failed to fetch posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dairyPost/${id}`, {
      headers: { ...authHeaders() },
    });
    if (!response.ok) {
      handleAuthFailure(response);
      throw new Error('Failed to fetch post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

export const searchPosts = async (keyword) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dairyPosts/keyword/${keyword}`, {
      headers: { ...authHeaders() },
    });
    if (!response.ok) {
      handleAuthFailure(response);
      throw new Error('Failed to search posts');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching posts:', error);
    throw error;
  }
};

export const addPost = async (postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/addPost`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      handleAuthFailure(response);
      throw new Error('Failed to add post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error adding post:', error);
    throw error;
  }
};

export const updatePost = async (postData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dairyPost`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
      handleAuthFailure(response);
      throw new Error('Failed to update post');
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/dairyPost/${id}`, {
      method: 'DELETE',
      headers: { ...authHeaders() },
    });
    if (!response.ok) {
      handleAuthFailure(response);
      throw new Error('Failed to delete post');
    }
    return await response.text();
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

export const loadDefaults = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/load`, {
      headers: { ...authHeaders() },
    });
    if (!response.ok) {
      handleAuthFailure(response);
      throw new Error('Failed to load defaults');
    }
    return await response.text();
  } catch (error) {
    console.error('Error loading defaults:', error);
    throw error;
  }
};
