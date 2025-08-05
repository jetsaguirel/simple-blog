// Custom middleware functions

// Request logging middleware
const requestLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
};

// Not found middleware
const notFound = (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.url
  });
};

module.exports = {
  requestLogger,
  errorHandler,
  notFound
};
