const express = require('express');
const config = require('./config');
const { connectDB, getConnectionStatus } = require('./config/database');
const app = express();

// Connect to database
connectDB();

// Import modular components  
const routes = require('./src/routes');
const middleware = require('./src/middleware');

// Global Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security & CORS middleware (add when needed)
// app.use(cors());
// app.use(helmet());

// Request logging
app.use(middleware.requestLogger);

// Non-API routes (server info, health checks)
app.get('/', (req, res) => {
  res.json({ 
    message: 'Simple Blog API Server',
    status: 'Running',
    environment: config.nodeEnv,
    apiVersion: config.apiVersion,
    apiBaseUrl: config.getApiBaseUrl(),
    timestamp: new Date().toISOString(),
    documentation: `${req.protocol}://${req.get('host')}/api/v1`
  });
});

app.get('/health', (req, res) => {
  const dbStatus = getConnectionStatus();
  res.json({ 
    status: 'OK', 
    uptime: process.uptime(),
    environment: config.nodeEnv,
    port: config.port,
    database: {
      connected: dbStatus.isConnected,
      name: dbStatus.name,
      host: dbStatus.host,
      readyState: dbStatus.readyState
    },
    timestamp: new Date().toISOString()
  });
});

// API Routes - All versioning handled in routes module
app.use('/api', routes);

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.path,
    method: req.method
  });
});

// Error handling middleware (should be last)
app.use(middleware.errorHandler);

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
  console.log(`http://localhost:${config.port}`);
  console.log(`Environment: ${config.nodeEnv}`);
  console.log(`API Base: ${config.getApiBaseUrl()}`);
});
