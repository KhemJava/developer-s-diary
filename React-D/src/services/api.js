// src/services/api.js
const API_BASE_URL = 'http://localhost:8080';

export const getAllPosts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/dairyPosts`);
    if (!response.ok) {
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
    const response = await fetch(`${API_BASE_URL}/dairyPost/${id}`);
    if (!response.ok) {
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
    const response = await fetch(`${API_BASE_URL}/dairyPosts/keyword/${keyword}`);
    if (!response.ok) {
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
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
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
      },
      body: JSON.stringify(postData),
    });
    if (!response.ok) {
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
    });
    if (!response.ok) {
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
    const response = await fetch(`${API_BASE_URL}/load`);
    if (!response.ok) {
      throw new Error('Failed to load defaults');
    }
    return await response.text();
  } catch (error) {
    console.error('Error loading defaults:', error);
    throw error;
  }
};