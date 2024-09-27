import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { handleApiError } from '../../utils/handleErrors.js';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  toast.error("Erro ao preparar a requisição");
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(response => {
  return response;
}, (error) => {
  handleApiError(error); 
  return Promise.reject(error);
});

export default axiosInstance;
