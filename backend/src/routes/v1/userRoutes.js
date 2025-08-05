const express = require('express');
const { body } = require('express-validator');
const UserController = require('../../controllers/UserController');
const auth = require('../../middleware/auth');
const router = express.Router();

router.get('/profile', auth, UserController.getProfile);

router.put('/profile', [
  auth,
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').optional().isEmail().withMessage('Please enter a valid email'),
  body('currentPassword').optional().isLength({ min: 1 }).withMessage('Current password is required to update profile'),
  body('newPassword').optional().isLength({ min: 6 }).withMessage('New password must be at least 6 characters')
], UserController.updateProfile);

router.get('/:id', UserController.getUserById);

module.exports = router;
