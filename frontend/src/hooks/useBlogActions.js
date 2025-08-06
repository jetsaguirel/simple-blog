import { useState, useCallback } from 'react';
import { blogService } from '../services';
import { useAuth } from '../context/AuthContext';

export const useBlogActions = () => {
  const { isAuthenticated, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const likeBlog = useCallback(async (blogId) => {
    if (!isAuthenticated) {
      setError('Please log in to like blogs');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      await blogService.likeBlog(blogId);
      return true;
    } catch (error) {
      console.error('Error liking blog:', error);
      setError(error.response?.data?.message || 'Failed to like blog');
      return false;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const dislikeBlog = useCallback(async (blogId) => {
    if (!isAuthenticated) {
      setError('Please log in to dislike blogs');
      return false;
    }

    try {
      setLoading(true);
      setError(null);
      await blogService.dislikeBlog(blogId);
      return true;
    } catch (error) {
      console.error('Error disliking blog:', error);
      setError(error.response?.data?.message || 'Failed to dislike blog');
      return false;
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const deleteBlog = useCallback(async (blogId) => {
    try {
      setLoading(true);
      setError(null);
      await blogService.deleteBlog(blogId);
      return true;
    } catch (error) {
      console.error('Error deleting blog:', error);
      setError(error.response?.data?.message || 'Failed to delete blog');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const createBlog = useCallback(async (blogData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogService.createBlog(blogData);
      return {
        success: true,
        blog: response.data.blog || response.data.data || response.data
      };
    } catch (error) {
      console.error('Error creating blog:', error);
      setError(error.response?.data?.message || 'Failed to create blog');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateBlog = useCallback(async (blogId, blogData) => {
    try {
      setLoading(true);
      setError(null);
      const response = await blogService.updateBlog(blogId, blogData);
      return {
        success: true,
        blog: response.data.blog || response.data.data || response.data
      };
    } catch (error) {
      console.error('Error updating blog:', error);
      setError(error.response?.data?.message || 'Failed to update blog');
      return { success: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const isOwner = useCallback((blog) => {
    const userId = user?._id || user?.id;
    const blogAuthorId = blog?.author?._id || blog?.author?.id;
    return isAuthenticated && userId && blogAuthorId && userId.toString() === blogAuthorId.toString();
  }, [isAuthenticated, user]);

  const isLiked = useCallback((blog) => {
    const userId = user?._id || user?.id;
    return blog?.likes?.includes(userId);
  }, [user]);

  const isDisliked = useCallback((blog) => {
    const userId = user?._id || user?.id;
    return blog?.dislikes?.includes(userId);
  }, [user]);

  return {
    loading,
    error,
    clearError,
    likeBlog,
    dislikeBlog,
    deleteBlog,
    createBlog,
    updateBlog,
    isOwner,
    isLiked,
    isDisliked
  };
};
