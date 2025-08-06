import api from './api';

export const authService = {
  // Register new user
  register: async (userData) => {
    return api.post('/auth/register', userData);
  },

  // Login user
  login: async (credentials) => {
    return api.post('/auth/login', credentials);
  },

  // Get current user profile
  getProfile: async () => {
    return api.get('/auth/me');
  },

  // Update password
  updatePassword: async (passwordData) => {
    return api.put('/auth/password', passwordData);
  },

  // Refresh token (if implemented in backend)
  refreshToken: async () => {
    return api.post('/auth/refresh');
  },

  // Logout (clear local storage)
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export default authService;
