import axios from 'axios';
import api from './api';

export const addExpenseToServer = async (expenseData) => {
  try {
    console.log(expenseData);
    const response = await api.post('/expense', expenseData);
    console.log('Expense added successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

export const getExpenses = async (page = 1, size = 20) => {
    try {
        const response = await api.get(`/expense`).then((response) => response.data).then((data) => {data.forEach(function (d, index) {d.id = index+1;}); return data;});
    //  const response = await api.get('/expense', expenseData);;
        console.log('Get All Expenses', response);
        return response;
    } catch (error) {
      console.error('Error getting expense from server:', error);
      throw error;
    }
  };

  export const getTotalCostForYear = async (year) => {
    try{
      const response = await api.get(`/expense/total-cost/year?year=${year}`);
      console.log('getTotalCostForYear', response);
      return response;
    }catch(error){
      console.error('Error getting expense from server:', error);
      throw error;
    }
  };

  export const getTotalCostForMonth = async (year, month) => {
    try{
      const response = await api.get(`/expense/total-cost/month?year=${year}&month=${month}`);
      console.log('Expense from server:', response);
      return response;
    }catch(error){
      console.error('Error getting expense from server:', error);
      throw error;
    }
  };

  export const getTotalCostForEachCategoryForYear = async(year) => {
    try{
      const response = await api.get(`/expense/total-cost/year/category?year=${year}`);
      console.log('Expense from server:', response);
      return response;
    }catch(error){
      console.error('Error getting expense from server:', error);
      throw error;
    }
  };

  export const getTotalCostForEachCategoryForMonth = async(year, month) => {
    try{
      const response = await api.get(`/expense/total-cost/month/category?year=${year}&month=${month}`).then((response) => response.data);
      console.log('Expense from server:', response);
      return response;
    }catch(error){
      console.error('Error getting expense from server:', error);
      throw error;
    }
  };