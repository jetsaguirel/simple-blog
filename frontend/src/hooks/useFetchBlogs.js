import { useState, useEffect, useCallback } from 'react';
import { blogService } from '../services';

export const useFetchBlogs = (filters = {}) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchBlogs = useCallback(async (resetList = false) => {
    try {
      setLoading(true);
      setError(null);
      
      const currentPage = resetList ? 1 : page;
      const fetchFilters = { ...filters, page: currentPage };
      
      const response = await blogService.getAllBlogs(fetchFilters);
      const newBlogs = response.data.blogs || response.data.data || response.data;
      
      if (resetList) {
        setBlogs(newBlogs);
        setPage(2);
      } else {
        setBlogs(prev => [...prev, ...newBlogs]);
        setPage(prev => prev + 1);
      }
      
      // Check if there are more blogs to load
      if (newBlogs.length === 0 || newBlogs.length < (filters.limit || 10)) {
        setHasMore(false);
      }
      
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError(error.response?.data?.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  const refreshBlogs = useCallback(() => {
    setPage(1);
    setHasMore(true);
    fetchBlogs(true);
  }, [fetchBlogs]);

  const loadMoreBlogs = useCallback(() => {
    if (!loading && hasMore) {
      fetchBlogs(false);
    }
  }, [fetchBlogs, loading, hasMore]);

  useEffect(() => {
    fetchBlogs(true);
  }, [filters.author, filters.search]); // Re-fetch when filters change

  return {
    blogs,
    loading,
    error,
    hasMore,
    refreshBlogs,
    loadMoreBlogs,
    setBlogs // Allow manual blog list updates
  };
};
