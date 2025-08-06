import api from './api';

export const blogService = {
  // Get all blogs with optional filters
  getAllBlogs: async (filters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.author) params.append('author', filters.author);
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    if (filters.search) params.append('search', filters.search);
    
    const queryString = params.toString();
    const url = queryString ? `/blogs?${queryString}` : '/blogs';
    
    return api.get(url);
  },

  // Get single blog by ID
  getBlogById: async (id) => {
    return api.get(`/blogs/${id}`);
  },

  // Create new blog
  createBlog: async (blogData) => {
    return api.post('/blogs', blogData);
  },

  // Update existing blog
  updateBlog: async (id, blogData) => {
    return api.put(`/blogs/${id}`, blogData);
  },

  // Delete blog
  deleteBlog: async (id) => {
    return api.delete(`/blogs/${id}`);
  },

  // Like a blog
  likeBlog: async (id) => {
    return api.post(`/blogs/${id}/like`);
  },

  // Dislike a blog
  dislikeBlog: async (id) => {
    return api.post(`/blogs/${id}/dislike`);
  },

  // Get user's blogs
  getUserBlogs: async (userId) => {
    return api.get(`/blogs?author=${userId}`);
  },

  // Get current user's blogs
  getMyBlogs: async () => {
    return api.get('/blogs/my-blogs');
  },

  // Search blogs
  searchBlogs: async (query, filters = {}) => {
    const params = new URLSearchParams({ search: query });
    
    if (filters.page) params.append('page', filters.page);
    if (filters.limit) params.append('limit', filters.limit);
    
    return api.get(`/blogs?${params.toString()}`);
  }
};

export default blogService;
