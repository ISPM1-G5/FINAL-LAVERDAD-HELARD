import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios';

// Configure Axios for Laravel Sanctum
// axios.defaults.baseURL = 'http://localhost:8000'; // Remove baseURL since Vite proxy handles /api routes
axios.defaults.withCredentials = true;
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Add request interceptor to include auth token
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// We can also fetch the CSRF cookie here to ensure it's ready for subsequent requests.
axios.get('/sanctum/csrf-cookie');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
