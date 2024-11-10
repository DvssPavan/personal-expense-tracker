import React from 'react';
import { AuthContext } from '../context/AuthContext';

const MockAuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ isAuthenticated: true, login: jest.fn(), logout: jest.fn() }}>
      {children}
    </AuthContext.Provider>
  );
};

export default MockAuthProvider;
