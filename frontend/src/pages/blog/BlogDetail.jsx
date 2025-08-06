import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { blogService } from '../../services';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await blogService.getBlogById(id);
      setBlog(response.data.blog || response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError(error.response?.data?.message || 'Failed to fetch blog');
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) return;
    
    try {
      setActionLoading(true);
      await blogService.likeBlog(id);
      await fetchBlog(); // Refresh to get updated counts
    } catch (error) {
      console.error('Error liking blog:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDislike = async () => {
    if (!isAuthenticated) return;
    
    try {
      setActionLoading(true);
      await blogService.dislikeBlog(id);
      await fetchBlog(); // Refresh to get updated counts
    } catch (error) {
      console.error('Error disliking blog:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      setActionLoading(true);
      await blogService.deleteBlog(id);
      navigate('/my-blogs');
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading blog..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchBlog} />;
  }

  if (!blog) {
    return <ErrorMessage message="Blog not found" />;
  }

  const isOwner = isAuthenticated && user?._id === blog.author?._id;
  const isLiked = blog.likes?.includes(user?._id);
  const isDisliked = blog.dislikes?.includes(user?._id);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Blog Header */}
      <div className="mb-8">
        <nav className="text-sm breadcrumbs mb-4">
          <ul>
            <li><Link to="/" className="link link-primary">Home</Link></li>
            <li>Blog</li>
            <li className="text-base-content/70">{blog.title}</li>
          </ul>
        </nav>

        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <div className="flex items-center space-x-4 text-base-content/70">
              <div className="flex items-center space-x-2">
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full bg-neutral text-neutral-content flex items-center justify-center">
                    <span className="text-sm">{blog.author?.name?.charAt(0)?.toUpperCase()}</span>
                  </div>
                </div>
                <Link 
                  to={`/user/${blog.author?._id}`} 
                  className="link link-primary hover:link-secondary"
                >
                  {blog.author?.name}
                </Link>
              </div>
              <span>•</span>
              <span>{new Date(blog.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
              {blog.updatedAt !== blog.createdAt && (
                <>
                  <span>•</span>
                  <span className="text-sm">Updated {new Date(blog.updatedAt).toLocaleDateString()}</span>
                </>
              )}
            </div>
          </div>

          {/* Owner Actions */}
          {isOwner && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                <li>
                  <Link to={`/edit-blog/${blog._id}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Blog
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleDelete}
                    className="text-error hover:bg-error hover:text-error-content"
                    disabled={actionLoading}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete Blog
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Blog Content */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <div className="prose max-w-none">
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-base leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Reactions & Actions */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <button 
                className={`btn btn-sm ${isLiked ? 'btn-primary' : 'btn-outline'}`}
                onClick={handleLike}
                disabled={actionLoading}
              >
                <span className="mr-1">👍</span>
                {blog.likes?.length || 0}
              </button>
              <button 
                className={`btn btn-sm ${isDisliked ? 'btn-error' : 'btn-outline'}`}
                onClick={handleDislike}
                disabled={actionLoading}
              >
                <span className="mr-1">👎</span>
                {blog.dislikes?.length || 0}
              </button>
            </>
          ) : (
            <div className="flex space-x-4 text-base-content/70">
              <span className="flex items-center space-x-1">
                <span>👍</span>
                <span>{blog.likes?.length || 0}</span>
              </span>
              <span className="flex items-center space-x-1">
                <span>👎</span>
                <span>{blog.dislikes?.length || 0}</span>
              </span>
              <span className="text-sm">Login to react</span>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <button 
            className="btn btn-sm btn-ghost"
            onClick={() => navigator.share ? navigator.share({
              title: blog.title,
              text: blog.content.substring(0, 100) + '...',
              url: window.location.href
            }) : navigator.clipboard.writeText(window.location.href)}
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Share
          </button>
          <Link to="/" className="btn btn-sm btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
