require('dotenv').config();

const config = {
  // Server Configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // API Configuration
  apiVersion: process.env.API_VERSION || 'v1',
  
  // Helper methods
  isDevelopment: () => config.nodeEnv === 'development',
  isProduction: () => config.nodeEnv === 'production',
  
  // API Base URL
  getApiBaseUrl: () => `/api/${config.apiVersion}`
};

module.exports = config;
