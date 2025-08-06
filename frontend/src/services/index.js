// Export all services from a central location
export { default as authService } from './authService';
export { default as blogService } from './blogService';
export { default as userService } from './userService';
export { default as api } from './api';

// Re-export the specific APIs for backward compatibility
export { authAPI, blogAPI, userAPI } from './api';
