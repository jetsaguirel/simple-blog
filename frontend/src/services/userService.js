import api from './api';

export const userService = {
  // Update current user profile
  updateProfile: async (userData) => {
    return api.put('/users/profile', userData);
  },

  // Get public user profile by ID
  getUserProfile: async (userId) => {
    return api.get(`/users/${userId}`);
  },

  // Get all users (if needed for admin features)
  getAllUsers: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.search) params.append('search', filters.search);
    
    const queryString = params.toString();
    const url = queryString ? `/users?${queryString}` : '/users';
    
    return api.get(url);
  },

  // Search users
  searchUsers: async (query, filters = {}) => {
    const params = new URLSearchParams({ search: query });
    
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    return api.get(`/users?${params.toString()}`);
  }
};

export default userService;
