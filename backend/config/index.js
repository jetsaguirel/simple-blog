require('dotenv').config();

const config = {
  // Server Configuration
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // API Configuration
  apiVersion: process.env.API_VERSION || 'v1',
  
  // Database Configuration
  database: {
    uri: `${process.env.MONGODB_URI}/${process.env.DB_NAME}-${process.env.NODE_ENV || 'development'}`,
    options: {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    }
  },
  
  // Helper methods
  isDevelopment: () => config.nodeEnv === 'development',
  isProduction: () => config.nodeEnv === 'production',
  
  // API Base URL
  getApiBaseUrl: () => `/api/${config.apiVersion}`
};

module.exports = config;
