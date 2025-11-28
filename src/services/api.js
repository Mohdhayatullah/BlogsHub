// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'https://blogsbackend-3g0m.onrender.com/blogs/v1.0';
// http://localhost:1000/blogs/v1.0
// https://blogsbackend-3g0m.onrender.com
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
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


// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/regis', data),
  login: (data) => api.post('/login', data),
  getProfile: () => api.get('/p'),
  updateProfile: (data) => api.put('/put', data),
  forgetPassword: (password) => api.patch('/blogs', null, { params: { pass: password } }),
};

// Blog APIs
export const blogAPI = {
  getAllBlogs: () => api.get('/blogs'),
  getMyBlogs: () => api.get('/blogs/private'),
  getBlogById: (id) => api.get(`/blogs/${id}`),
  createBlog: (data) => api.post('/blogs', data),
  updateBlog: (id, data) => api.put(`/blogs/${id}`, data),
  deleteBlog: (id) => api.delete(`/blogs/${id}`),
};

// Feedback APIs
export const feedbackAPI = {
  createFeedback: (blogId, rating, comment) => 
    api.post('/feedback', null, { params: { blogId, rating, comment } }),
  getFeedbackByBlog: (blogId) => api.get(`/feedback/blog/${blogId}`),
  getFeedbackByUser: (userId) => api.get(`/feedback/user/${userId}`),
  updateFeedback: (feedbackId, rating, comment) => 
    api.put(`/feedback/${feedbackId}`, null, { params: { rating, comment } }),
  deleteFeedback: (feedbackId) => api.delete(`/feedback/${feedbackId}`),
  getAverageRating: (blogId) => api.get(`/feedback/blog/${blogId}/average-rating`),
};

export default api;