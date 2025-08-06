const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const User = require('../models/User');

class UserController {
  static async getProfile(req, res) {
    try {
      const user = await User.findById(req.user._id).select('-password');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt
        }
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ error: 'Server error while fetching profile' });
    }
  }

  static async updateProfile(req, res) {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { name, email, currentPassword, newPassword } = req.body;
      const user = await User.findById(req.user._id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Require current password for any profile changes (security measure)
      if (!currentPassword) {
        return res.status(400).json({ error: 'Current password is required to update profile' });
      }

      // Verify current password
      const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isCurrentPasswordValid) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }

      // If updating email, check if it's already taken by another user
      if (email && email !== user.email) {
        const existingUser = await User.findOne({ email, _id: { $ne: req.user._id } });
        if (existingUser) {
          return res.status(400).json({ error: 'Email is already in use by another account' });
        }
      }

      // If updating password, validate new password
      if (newPassword) {
        if (newPassword.length < 6) {
          return res.status(400).json({ error: 'New password must be at least 6 characters long' });
        }
      }

      // Update fields if provided
      if (name) user.name = name;
      if (email) user.email = email;
      if (newPassword) {
        user.password = newPassword; // Will be hashed by the pre-save middleware
      }

      await user.save();

      res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          updatedAt: user.updatedAt
        },
        message: 'Profile updated successfully'
      });
    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({ error: 'Server error while updating profile' });
    }
  }

  static async getUserById(req, res) {
    try {
      const user = await User.findById(req.params.id).select('name email createdAt');
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json({
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt
        }
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ error: 'Server error while fetching user' });
    }
  }
}

module.exports = UserController;
