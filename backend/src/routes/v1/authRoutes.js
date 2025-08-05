const express = require('express');
const { body } = require('express-validator');
const AuthController = require('../../controllers/AuthController');
const auth = require('../../middleware/auth');
const router = express.Router();

router.post('/register', [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
], AuthController.register);

router.post('/login', [
  body('email').isEmail().withMessage('Please enter a valid email'),
  body('password').exists().withMessage('Password is required')
], AuthController.login);

router.get('/me', auth, AuthController.getCurrentUser);

module.exports = router;
