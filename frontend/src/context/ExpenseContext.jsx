// src/context/ExpenseContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
const ExpenseContext = createContext();

export const useExpense = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [yearFilter, setYearFilter] = useState(2024);
  const [filters, setFilters] = useState({});
  const [loading, setLoading] = useState(true);

  const addExpense = (expense) => {
    /* TODO: Check if user is authenticated before adding expense */
    if (isAuthenticated) {
        if (true) {
      setExpenses((prevExpenses) => [...prevExpenses, expense]);
    } else {
      console.error("User must be logged in to add expenses");
    }
  }
  };
  
  const addFilter = (filter) => {
    // if (isAuthenticated) {
      if (true) {
        setFilters(filter);
      } else {
        console.error("User must be logged in");
      }
  };

  const addYearFilter = (year) => {
    // if (isAuthenticated) {
      if (true) {
        setYearFilter(year);
      } else {
        console.error("User must be logged in");
      }
  };

  return (
    <ExpenseContext.Provider value={{ expenses, setLoading, setExpenses, addExpense, filters, addFilter, yearFilter, addYearFilter, loading }}>
      {children}
    </ExpenseContext.Provider>
  );
};