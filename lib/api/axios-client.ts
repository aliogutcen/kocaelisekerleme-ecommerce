import axios, { AxiosInstance, AxiosError } from 'axios';

// First install axios: npm install axios

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

// Create axios instance
export const axiosClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => {
    // Return only the data
    return response.data;
  },
  (error: AxiosError) => {
    // Handle errors
    if (error.response) {
      // Server responded with error
      console.error('API Error:', error.response.data);
      
      // Handle specific status codes
      switch (error.response.status) {
        case 401:
          // Unauthorized - redirect to login
          localStorage.removeItem('token');
          window.location.href = '/login';
          break;
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
      }
    } else if (error.request) {
      // Request made but no response
      console.error('Network error:', error.request);
    } else {
      // Something else happened
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Type-safe API methods
export const apiClient = {
  get: <T>(url: string, params?: any) => 
    axiosClient.get<T, T>(url, { params }),
  
  post: <T>(url: string, data?: any) => 
    axiosClient.post<T, T>(url, data),
  
  put: <T>(url: string, data?: any) => 
    axiosClient.put<T, T>(url, data),
  
  patch: <T>(url: string, data?: any) => 
    axiosClient.patch<T, T>(url, data),
  
  delete: <T>(url: string) => 
    axiosClient.delete<T, T>(url),
};