import axios from 'axios';

const api = axios.create({
  baseURL: 'https://blog-backend-n7v3.onrender.com/api',
});

export default api;
