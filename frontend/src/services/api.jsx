import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Set your base API URL
});

export default api;
