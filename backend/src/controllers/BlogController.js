const { validationResult } = require('express-validator');
const Blog = require('../models/Blog');

class BlogController {
  static async getAllBlogs(req, res) {
    try {
      // Build query filter based on query parameters
      const filter = {};
      
      // Filter by author if provided
      if (req.query.author) {
        filter.author = req.query.author;
      }
      
      // Filter by search if provided
      if (req.query.search) {
        filter.$or = [
          { title: { $regex: req.query.search, $options: 'i' } },
          { content: { $regex: req.query.search, $options: 'i' } }
        ];
      }
      
      console.log('BlogController - getAllBlogs filter:', filter); // Debug log
      
      const blogs = await Blog.find(filter)
        .populate('author', 'name email')
        .sort({ createdAt: -1 })
        .lean();

      // Add like/dislike counts
      const blogsWithCounts = blogs.map(blog => ({
        ...blog,
        likeCount: blog.likes.length,
        dislikeCount: blog.dislikes.length
      }));

      res.json({ blogs: blogsWithCounts });
    } catch (error) {
      console.error('Get blogs error:', error);
      res.status(500).json({ error: 'Server error while fetching blogs' });
    }
  }

  static async getBlogById(req, res) {
    try {
      const blog = await Blog.findById(req.params.id)
        .populate('author', 'name email')
        .lean();

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      // Add like/dislike counts
      const blogWithCounts = {
        ...blog,
        likeCount: blog.likes.length,
        dislikeCount: blog.dislikes.length
      };

      res.json({ blog: blogWithCounts });
    } catch (error) {
      console.error('Get blog error:', error);
      res.status(500).json({ error: 'Server error while fetching blog' });
    }
  }

  static async createBlog(req, res) {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { title, content } = req.body;

      const blog = new Blog({
        title,
        content,
        author: req.user._id
      });

      await blog.save();
      await blog.populate('author', 'name email');

      res.status(201).json({
        blog: {
          ...blog.toJSON(),
          likeCount: 0,
          dislikeCount: 0
        },
        message: 'Blog created successfully'
      });
    } catch (error) {
      console.error('Create blog error:', error);
      res.status(500).json({ error: 'Server error while creating blog' });
    }
  }

  static async updateBlog(req, res) {
    try {
      console.log('UpdateBlog - Request params:', req.params);
      console.log('UpdateBlog - Request body:', req.body);
      console.log('UpdateBlog - Request user:', req.user ? { id: req.user._id, name: req.user.name } : 'No user');
      
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        console.log('UpdateBlog - Blog not found for ID:', req.params.id);
        return res.status(404).json({ error: 'Blog not found' });
      }

      console.log('UpdateBlog - Blog found:', { 
        id: blog._id, 
        title: blog.title, 
        author: blog.author.toString() 
      });
      
      // Check if user is the author
      if (blog.author.toString() !== req.user._id.toString()) {
        console.log('UpdateBlog - Authorization failed:', {
          blogAuthor: blog.author.toString(),
          currentUser: req.user._id.toString()
        });
        return res.status(403).json({ error: 'Not authorized to update this blog' });
      }

      console.log('UpdateBlog - Authorization successful');
      
      const { title, content } = req.body;

      if (title) blog.title = title;
      if (content) blog.content = content;

      await blog.save();
      await blog.populate('author', 'name email');

      console.log('UpdateBlog - Blog updated successfully');

      res.json({
        blog: {
          ...blog.toJSON(),
          likeCount: blog.likes.length,
          dislikeCount: blog.dislikes.length
        },
        message: 'Blog updated successfully'
      });
    } catch (error) {
      console.error('Update blog error:', error);
      res.status(500).json({ error: 'Server error while updating blog' });
    }
  }

  static async deleteBlog(req, res) {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      // Check if user is the author
      if (blog.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: 'Not authorized to delete this blog' });
      }

      await Blog.findByIdAndDelete(req.params.id);

      res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
      console.error('Delete blog error:', error);
      res.status(500).json({ error: 'Server error while deleting blog' });
    }
  }

  static async likeBlog(req, res) {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      const userId = req.user._id;
      const userIdString = userId.toString();

      // Check if user already liked the blog
      const alreadyLiked = blog.likes.some(id => id.toString() === userIdString);
      const alreadyDisliked = blog.dislikes.some(id => id.toString() === userIdString);

      let updateQuery = {};
      let message = '';

      if (alreadyLiked) {
        // Remove like
        updateQuery = { $pull: { likes: userId } };
        message = 'Like removed';
      } else {
        // Add like and remove dislike if present
        updateQuery = { 
          $addToSet: { likes: userId },
          $pull: { dislikes: userId }
        };
        message = 'Blog liked';
      }

      // Update without triggering updatedAt
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        updateQuery,
        { 
          new: true,
          timestamps: false // This prevents updatedAt from being modified
        }
      );

      const isLiked = updatedBlog.likes.some(id => id.toString() === userIdString);

      res.json({
        likeCount: updatedBlog.likes.length,
        dislikeCount: updatedBlog.dislikes.length,
        userReaction: isLiked ? 'like' : null,
        message: message
      });
    } catch (error) {
      console.error('Like blog error:', error);
      res.status(500).json({ error: 'Server error while liking blog' });
    }
  }

  static async dislikeBlog(req, res) {
    try {
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      const userId = req.user._id;
      const userIdString = userId.toString();

      // Check if user already disliked the blog
      const alreadyLiked = blog.likes.some(id => id.toString() === userIdString);
      const alreadyDisliked = blog.dislikes.some(id => id.toString() === userIdString);

      let updateQuery = {};
      let message = '';

      if (alreadyDisliked) {
        // Remove dislike
        updateQuery = { $pull: { dislikes: userId } };
        message = 'Dislike removed';
      } else {
        // Add dislike and remove like if present
        updateQuery = { 
          $addToSet: { dislikes: userId },
          $pull: { likes: userId }
        };
        message = 'Blog disliked';
      }

      // Update without triggering updatedAt
      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        updateQuery,
        { 
          new: true,
          timestamps: false // This prevents updatedAt from being modified
        }
      );

      const isDisliked = updatedBlog.dislikes.some(id => id.toString() === userIdString);

      res.json({
        likeCount: updatedBlog.likes.length,
        dislikeCount: updatedBlog.dislikes.length,
        userReaction: isDisliked ? 'dislike' : null,
        message: message
      });
    } catch (error) {
      console.error('Dislike blog error:', error);
      res.status(500).json({ error: 'Server error while disliking blog' });
    }
  }
}

module.exports = BlogController;
