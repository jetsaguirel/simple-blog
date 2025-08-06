import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { blogService } from '../../services';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const MyBlogs = () => {
  const { user } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      // Get user ID (could be _id or id depending on backend response)
      const userId = user._id || user.id;
      
      if (!userId) {
        setError('User ID not found. Please try logging out and back in.');
        return;
      }
      
      console.log('MyBlogs - Fetching blogs for user ID:', userId);
      
      // Try to get user's blogs - adjust based on your API
      const response = await blogService.getUserBlogs(userId);
      setBlogs(response.data.blogs || response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching my blogs:', error);
      setError(error.response?.data?.message || 'Failed to fetch your blogs');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (blogId, blogTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`)) {
      return;
    }

    try {
      setDeleteLoading(blogId);
      await blogService.deleteBlog(blogId);
      // Remove the deleted blog from the state
      setBlogs(blogs.filter(blog => blog._id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return <Loading message="Loading your blogs..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchMyBlogs} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Blogs</h1>
          <p className="text-base-content/70 mt-2">
            Manage and view all your published blogs
          </p>
        </div>
        <Link to="/create-blog" className="btn btn-primary">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Write New Blog
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Total Blogs</div>
          <div className="stat-value text-primary">{blogs.length}</div>
          <div className="stat-desc">Published articles</div>
        </div>
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Total Likes</div>
          <div className="stat-value text-secondary">
            {blogs.reduce((sum, blog) => sum + (blog.likes?.length || 0), 0)}
          </div>
          <div className="stat-desc">Across all blogs</div>
        </div>
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Engagement</div>
          <div className="stat-value text-accent">
            {blogs.reduce((sum, blog) => sum + (blog.likes?.length || 0) + (blog.dislikes?.length || 0), 0)}
          </div>
          <div className="stat-desc">Total interactions</div>
        </div>
      </div>

      {/* Blogs List */}
      {blogs.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold mb-2">No blogs yet</h3>
          <p className="text-base-content/70 mb-6">
            Start sharing your thoughts and ideas with the community!
          </p>
          <Link to="/create-blog" className="btn btn-primary btn-lg">
            Write Your First Blog
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
              <div className="card-body">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <Link to={`/blog/${blog._id}`} className="card-title text-xl hover:link">
                      {blog.title}
                    </Link>
                    <p className="text-base-content/70 mt-2 line-clamp-3">
                      {blog.content.length > 200 
                        ? `${blog.content.substring(0, 200)}...` 
                        : blog.content
                      }
                    </p>
                    
                    <div className="flex items-center space-x-4 mt-4 text-sm text-base-content/60">
                      <span>
                        Created: {new Date(blog.createdAt).toLocaleDateString()}
                      </span>
                      {blog.updatedAt !== blog.createdAt && (
                        <span>
                          Updated: {new Date(blog.updatedAt).toLocaleDateString()}
                        </span>
                      )}
                      <div className="flex space-x-3">
                        <span className="flex items-center space-x-1">
                          <span>👍</span>
                          <span>{blog.likes?.length || 0}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <span>👎</span>
                          <span>{blog.dislikes?.length || 0}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2 ml-4">
                    <Link 
                      to={`/blog/${blog._id}`}
                      className="btn btn-sm btn-ghost"
                      title="View Blog"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </Link>
                    <Link 
                      to={`/edit-blog/${blog._id}`}
                      className="btn btn-sm btn-primary"
                      title="Edit Blog"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Link>
                    <button 
                      onClick={() => handleDelete(blog._id, blog.title)}
                      className={`btn btn-sm btn-error ${deleteLoading === blog._id ? 'loading' : ''}`}
                      disabled={deleteLoading === blog._id}
                      title="Delete Blog"
                    >
                      {deleteLoading === blog._id ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      {blogs.length > 0 && (
        <div className="mt-8 text-center">
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title justify-center mb-4">Quick Actions</h3>
              <div className="flex justify-center space-x-4">
                <Link to="/create-blog" className="btn btn-primary">
                  Write New Blog
                </Link>
                <Link to="/" className="btn btn-ghost">
                  View All Blogs
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
