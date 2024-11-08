import axios from 'axios';
import api from './api';

export const getUser = async (token) => {
  try {
    const response = await api.post('/expense' );
    return response.data;
  } catch (error) {
    console.error('Error adding expense:', error);
    throw error;
  }
};