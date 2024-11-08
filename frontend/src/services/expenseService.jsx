import api from './api';

export const addExpenseToServer = async (expenseData) => {
  try {
    const response = await api.post('/expense', expenseData);
    return response.data;
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};

export const getExpenses = async (page = 1, size = 20) => {
    try {
        const response = await api.get(`/expense`).then((response) => response.data).then((data) => {data.forEach(function (d, index) {d.id = index+1;}); return data;});
        return response;
    } catch (error) {
      console.error('Error getting expense from server:', error);
      throw error;
    }
  };

  export const getTotalCostForYear = async (year) => {
    try{
      const response = await api.get(`/expense/total-cost/year?year=${year}`);
      return response;
    }catch(error){
      console.error('Error getting expense from server:', error);
      throw error;
    }
  };

  export const getTotalCostForMonth = async (year, month) => {
    try{
      const response = await api.get(`/expense/total-cost/month?year=${year}&month=${month}`);
      return response;
    }catch(error){
      console.error('Error getting expense from server:', error);
      throw error;
    }
  };

  export const getTotalCostForEachCategoryForYear = async(year) => {
    try{
      const response = await api.get(`/expense/total-cost/year/category?year=${year}`);
      return response;
    }catch(error){
      console.error('Error getting expense from server:', error);
      throw error;
    }
  };

  export const getTotalCostForEachCategoryForMonth = async(year, month) => {
    try{
      const response = await api.get(`/expense/total-cost/month/category?year=${year}&month=${month}`);
      return response;
    }catch(error){
      console.error('Error getting expense from server:', error);
      throw error;
    }
  };

  export const getTotalExpenseForEachMonthOfTheYear = async(year) => {
    try{
      const response = await api.get(`/expense/yearly-expenses?year=${year}`);
      return response;
    }catch(error){
      console.error('Error getting expense from server:', error);
      throw error;
    }
  }