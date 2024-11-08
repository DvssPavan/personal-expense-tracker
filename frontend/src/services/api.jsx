import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080', // Set your base API URL
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Basic ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
export default api;
