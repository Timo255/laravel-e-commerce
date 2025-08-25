import axios from "axios";
const BASE_URL = import.meta.env.VITE_APIURL;

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

// Add request interceptor to include CSRF token in headers
const addCSRFToken = (config) => {
  const token = document.cookie
    .split('; ')
    .find(row => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
  
  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token);
  }
  
  return config;
};

// Apply interceptor to the main instance
api.interceptors.request.use(addCSRFToken);

// Optional: Add response interceptor for error handling
const handleResponseError = (error) => {
  if (error.response?.status === 419) {
    // CSRF token mismatch - refresh and retry
    console.log('CSRF token expired, refreshing...');
    window.location.reload();
  }
  return Promise.reject(error);
};

api.interceptors.response.use(
  (response) => response,
  handleResponseError
);

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
