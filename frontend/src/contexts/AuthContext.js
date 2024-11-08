import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token');
      api.defaults.headers.Authorization = `Bearer ${token}`;
      const userResponse = await api.get('/api/v1/users/me');
      setUser(userResponse.data);

    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  const login = async (formData) => {
    setLoading(true);
    try {
      const response = await api.post('/api/v1/users/login', formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });
      const token = response.data.access_token;
      setToken(token);
      localStorage.setItem('token', token);
      api.defaults.headers.Authorization = `Bearer ${token}`;

      await fetchUser();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
    delete api.defaults.headers.Authorization;
    navigate('/');  // Redirect to login after logout
  };

  const isAuthenticated = useCallback(() => {
    if (!token) return false;
    const { exp } = jwtDecode(token);
    return Date.now() < exp * 1000; 
  }, [token]);

  useEffect(() => {
    if (token) {
      if (isAuthenticated()) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
      } else {
        logout(); 
      }
    }
  }, [token, isAuthenticated]);

  return (
    <AuthContext.Provider value={{ token, user, loading, isAuthenticated, login, logout, fetchUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
