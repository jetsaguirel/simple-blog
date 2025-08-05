const express = require('express');
const router = express.Router();

// V1 API Routes
// Import v1 route modules
// const authRoutes = require('./authRoutes');
// const blogRoutes = require('./blogRoutes');
// const userRoutes = require('./userRoutes');

// V1 API documentation endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Simple Blog API v1',
    version: '1.0.0',
    status: 'STABLE',
    deprecation: null, // Will add deprecation notice when v2 is ready
    endpoints: {
      auth: {
        login: 'POST /auth/login',
        register: 'POST /auth/register',
        logout: 'POST /auth/logout'
      },
      blogs: {
        list: 'GET /blogs',
        create: 'POST /blogs',
        get: 'GET /blogs/:id',
        update: 'PUT /blogs/:id',
        delete: 'DELETE /blogs/:id',
        react: 'POST /blogs/:id/reactions'
      },
      users: {
        profile: 'GET /users/:id',
        update: 'PUT /users/:id'
      }
    }
  });
});

// Mount v1 route modules
// router.use('/auth', authRoutes);
// router.use('/blogs', blogRoutes);
// router.use('/users', userRoutes);

module.exports = router;
