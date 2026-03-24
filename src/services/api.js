import axios from 'axios';
import { getToken } from './storage';

const api = axios.create({
  baseURL: 'https://your-api.com/api',   // اپنا backend URL
});

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;