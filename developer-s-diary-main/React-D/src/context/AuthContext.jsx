// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { loginUser, registerUser } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [username, setUsername] = useState(localStorage.getItem('username'));
  const [email, setEmail] = useState(localStorage.getItem('email'));

  const login = useCallback(async (usernameInput, password) => {
    const data = await loginUser(usernameInput, password);
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.username);
    localStorage.setItem('email', data.email || '');
    setToken(data.token);
    setUsername(data.username);
    setEmail(data.email || '');
    return data;
  }, []);

  const register = useCallback(async (usernameInput, emailInput, password) => {
    return registerUser(usernameInput, emailInput, password);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    setToken(null);
    setUsername(null);
    setEmail(null);
  }, []);

  const value = {
    token,
    username,
    email,
    isAuthenticated: !!token,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
