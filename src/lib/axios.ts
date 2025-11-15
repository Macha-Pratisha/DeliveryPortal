// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor to add JWT token
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('deliveryToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor to handle auth errors
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('deliveryToken');
//       localStorage.removeItem('deliveryUser');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;


import axios from 'axios';

// Determine base URL depending on environment
const BASE_URL = import.meta.env.MODE === "development"
  ? "http://localhost:5000/api" // dev backend
  : "/api";                     // production (same domain)

// Create axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ------------------ Request interceptor (JWT) ------------------
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('deliveryToken'); // your JWT key
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Debug log (optional)
    // console.log("Request:", config.method, config.baseURL + config.url, "Token:", token);
    return config;
  },
  (error) => Promise.reject(error)
);

// ------------------ Response interceptor (Auth errors) ------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('deliveryToken');
      localStorage.removeItem('deliveryUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
