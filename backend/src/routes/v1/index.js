const express = require('express');
const router = express.Router();

// V1 API Routes
// Import v1 route modules
const authRoutes = require('./authRoutes');
const blogRoutes = require('./blogRoutes');
const userRoutes = require('./userRoutes');

// V1 API documentation endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Simple Blog API v1',
    version: '1.0.0',
    status: 'STABLE',
    deprecation: null, // Will add deprecation notice when v2 is ready
    endpoints: {
      auth: {
        register: 'POST /auth/register',
        login: 'POST /auth/login',
        me: 'GET /auth/me'
      },
      blogs: {
        list: 'GET /blogs',
        create: 'POST /blogs',
        get: 'GET /blogs/:id',
        update: 'PUT /blogs/:id',
        delete: 'DELETE /blogs/:id',
        like: 'POST /blogs/:id/like',
        dislike: 'POST /blogs/:id/dislike'
      },
      users: {
        profile: 'GET /users/profile',
        updateProfile: 'PUT /users/profile',
        getUser: 'GET /users/:id'
      }
    }
  });
});

// Mount v1 route modules
router.use('/auth', authRoutes);
router.use('/blogs', blogRoutes);
router.use('/users', userRoutes);

module.exports = router;
