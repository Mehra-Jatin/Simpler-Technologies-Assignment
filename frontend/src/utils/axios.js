import axios from 'axios';


const baseURL = import.meta.env.VITE_SERVER_URL || 'http://localhost:5000';

export const axiosInstance = axios.create({
  baseURL: baseURL,
  withCredentials: true, 
});