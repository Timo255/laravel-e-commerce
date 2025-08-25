import axios from "axios";

const BASE_URL = import.meta.env.VITE_APIURL || 'https://laravel-e-commerce-backend.onrender.com';

// Create axios instance with your existing configuration
const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true
});

// Add request interceptor to include auth token for token-based authentication
const addAuthToken = (config) => {
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  
  return config;
};

// Apply auth token interceptor to the main instance
api.interceptors.request.use(addAuthToken);

// Production-ready response interceptor for error handling
const handleResponseError = (error) => {
  console.error('API Error:', error);
  
  // Handle 401 Unauthorized - token expired or invalid
  if (error.response?.status === 401) {
    console.log('Token expired or invalid, clearing auth data...');
    
    // Clear invalid token
    localStorage.removeItem('auth_token');
    delete api.defaults.headers.common['Authorization'];
    
    // Only redirect if not already on login/register pages
    const currentPath = window.location.pathname;
    const authPaths = ['/login', '/register', '/forgot-password', '/reset-password'];
    
    if (!authPaths.includes(currentPath)) {
      // Store current location for redirect after login
      localStorage.setItem('redirectAfterLogin', currentPath);
      window.location.href = '/login';
    }
  }
  
  // Handle 419 CSRF token mismatch (if using CSRF alongside tokens)
  if (error.response?.status === 419) {
    console.log('CSRF token mismatch...');
  }
  
  // Handle 403 Forbidden
  if (error.response?.status === 403) {
    console.log('Access forbidden - insufficient permissions');
  }
  
  // Handle 429 Too Many Requests
  if (error.response?.status === 429) {
    console.log('Rate limit exceeded');
  }
  
  // Handle network errors
  if (!error.response) {
    console.log('Network error - server may be unreachable');
  }
  
  return Promise.reject(error);
};

// Apply response interceptor to main instance
api.interceptors.response.use(
  (response) => response,
  handleResponseError
);

// Optional: Add success response interceptor for debugging in development
if (import.meta.env.DEV) {
  api.interceptors.response.use(
    (response) => {
      console.log('API Success:', response.config.method?.toUpperCase(), response.config.url, response.status);
      return response;
    },
    (error) => {
      console.log('API Error:', error.config?.method?.toUpperCase(), error.config?.url, error.response?.status);
      return Promise.reject(error);
    }
  );
}

export default api;

// export default axios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

// export const axiosPrivate = axios.create({
//   baseURL: BASE_URL,
//   headers: { 'Content-Type': 'application/json' },
//   withCredentials: true
// });
