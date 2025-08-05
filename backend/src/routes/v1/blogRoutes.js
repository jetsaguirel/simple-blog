const express = require('express');
const { body } = require('express-validator');
const BlogController = require('../../controllers/BlogController');
const auth = require('../../middleware/auth');
const router = express.Router();

router.get('/', BlogController.getAllBlogs);
router.get('/:id', BlogController.getBlogById);

router.post('/', [
  auth,
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('content').trim().isLength({ min: 1 }).withMessage('Content is required')
], BlogController.createBlog);

router.put('/:id', [
  auth,
  body('title').optional().trim().isLength({ min: 1 }).withMessage('Title cannot be empty'),
  body('content').optional().trim().isLength({ min: 1 }).withMessage('Content cannot be empty')
], BlogController.updateBlog);

router.delete('/:id', auth, BlogController.deleteBlog);
router.post('/:id/like', auth, BlogController.likeBlog);
router.post('/:id/dislike', auth, BlogController.dislikeBlog);

module.exports = router;
