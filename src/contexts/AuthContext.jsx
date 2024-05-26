// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import api from '../services/api';
import { saveToken, removeToken, getToken } from '../utils/auth.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
//   const history = useHistory();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser({ token });
    }
  }, []);

  const login = async (email, password) => {
    const response = await api.post('/login', { email, password });
    saveToken(response.data.token);
    setUser({ token: response.data.token });
  };

  const register = async (username, email, password) => {
    await api.post('/register', { username, email, password });
    // history.push('/login');
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
