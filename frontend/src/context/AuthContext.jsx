// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('authToken'));
  const[user, setUser] = useState('');

  const login = (token, username) => {
    localStorage.setItem('authToken', token); // Save token in local storage
    setUser(username);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('authToken'); // Remove token from local storage
    setIsAuthenticated(false);
  };

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem('authToken'));
  }, []);

  const setUserName = (name) => {
    setUser(name);
  }
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, setIsAuthenticated, setUserName, user }}>
      {children}
    </AuthContext.Provider>
  );
};
