import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { blogService } from '../../services';
import { validateBlogForm, estimateReadingTime } from '../../utils';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [blog, setBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    // Only fetch blog if user is available and has an ID
    console.log('EditBlog - User object:', user); // Debug log
    const userId = user?._id || user?.id;
    console.log('EditBlog - Extracted userId:', userId); // Debug log
    
    if (user && userId) {
      fetchBlog();
    } else if (user && !userId) {
      console.error('User object exists but has no ID:', user);
      setError('User data is incomplete. Please try logging out and back in.');
      setLoading(false);
    }
  }, [id, user]);

  const fetchBlog = async () => {
    if (!user) {
      setError('User not authenticated');
      setLoading(false);
      return;
    }

    // Get user ID (could be _id or id)
    const userId = user._id || user.id;
    if (!userId) {
      setError('User ID not found. Please try logging out and back in.');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(''); // Clear any previous errors
      const response = await blogService.getBlogById(id);
      const blogData = response.data.blog || response.data.data || response.data;
      
      // Check if user owns this blog - use string comparison for safety
      const blogAuthorId = blogData.author?._id?.toString() || blogData.author?.id?.toString();
      const currentUserId = userId.toString();
      
      console.log('Blog author ID:', blogAuthorId);
      console.log('Current user ID:', currentUserId);
      
      if (!blogAuthorId || !currentUserId || blogAuthorId !== currentUserId) {
        setError('You are not authorized to edit this blog');
        return;
      }
      
      setBlog(blogData);
      setFormData({
        title: blogData.title,
        content: blogData.content,
      });
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError(error.response?.data?.message || 'Failed to fetch blog');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const newFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };
    setFormData(newFormData);
    
    // Check for changes
    if (blog) {
      const hasChanges = newFormData.title !== blog.title || newFormData.content !== blog.content;
      setHasUnsavedChanges(hasChanges);
    }
    
    // Clear validation errors for the field being edited
    if (validationErrors[e.target.name]) {
      setValidationErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateBlogForm(formData);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setError('Please fix the validation errors below');
      return;
    }

    setSubmitting(true);
    setError('');
    setValidationErrors({});

    try {
      console.log('EditBlog - Submitting update:', {
        blogId: id,
        userId: user._id || user.id,
        data: formData
      });
      
      await blogService.updateBlog(id, formData);
      
      console.log('EditBlog - Update successful');
      
      setHasUnsavedChanges(false);
      
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error('EditBlog - Update error:', error);
      setError(error.response?.data?.message || 'Failed to update blog');
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    if (hasUnsavedChanges) {
      if (window.confirm('Are you sure you want to cancel? Your changes will be lost.')) {
        navigate(`/blog/${id}`);
      }
    } else {
      navigate(`/blog/${id}`);
    }
  };

  // Warn user about unsaved changes when leaving the page
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Check authentication first
  if (authLoading) {
    return <Loading message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card bg-base-100 shadow-xl max-w-md">
          <div className="card-body text-center">
            <h2 className="card-title justify-center">Authentication Required</h2>
            <p className="text-base-content/70 mb-4">
              Please log in to edit blogs.
            </p>
            <Link to="/" className="btn btn-primary">Go Home</Link>
          </div>
        </div>
      </div>
    );
  }

  // Debug user data
  console.log('EditBlog - User object:', user);
  console.log('EditBlog - User ID:', user?._id);
  console.log('EditBlog - User keys:', user ? Object.keys(user) : 'no user');

  // Show loading or error state for unauthenticated users
  if (loading || !user || (!user._id && !user.id)) {
    return <Loading message="Loading user data..." />;
  }

  if (error && !blog) {
    return <ErrorMessage message={error} onRetry={fetchBlog} />;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-sm breadcrumbs mb-4">
          <ul>
            <li><Link to="/" className="link link-primary">Home</Link></li>
            <li><Link to="/my-blogs" className="link link-primary">My Blogs</Link></li>
            <li><Link to={`/blog/${id}`} className="link link-primary">{blog?.title}</Link></li>
            <li className="text-base-content/70">Edit</li>
          </ul>
        </nav>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Edit Blog</h1>
            <p className="text-base-content/70 mt-2">
              Update your blog content
            </p>
            {/* Unsaved changes indicator */}
            <div className="flex items-center space-x-4 mt-2 text-sm">
              {hasUnsavedChanges && (
                <span className="text-warning">Unsaved changes</span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="avatar mb-2">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <span className="text-lg">{user?.name?.charAt(0)?.toUpperCase()}</span>
              </div>
            </div>
            {formData.content && (
              <div className="text-sm text-base-content/70">
                ~{estimateReadingTime(formData.content)} min read
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {error && (
            <div className="alert alert-error mb-6">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Title Input */}
            <div className="form-control w-full mb-6">
              <label className="label">
                <span className="label-text text-lg font-semibold">Blog Title</span>
                <span className="label-text-alt text-sm">
                  {formData.title.length}/200 characters
                </span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter an engaging title for your blog..."
                className={`input input-bordered input-lg w-full ${
                  validationErrors.title ? 'input-error' : ''
                }`}
                value={formData.title}
                onChange={handleChange}
                required
                maxLength={200}
              />
              {validationErrors.title && (
                <label className="label">
                  <span className="label-text-alt text-error">{validationErrors.title}</span>
                </label>
              )}
            </div>

            {/* Content Textarea */}
            <div className="form-control w-full mb-6">
              <label className="label">
                <span className="label-text text-lg font-semibold">Blog Content</span>
                <span className="label-text-alt text-sm">
                  {formData.content.length}/10,000 characters • {formData.content.trim().split(/\s+/).filter(word => word).length} words
                </span>
              </label>
              <textarea
                name="content"
                className={`textarea textarea-bordered w-full h-96 ${
                  validationErrors.content ? 'textarea-error' : ''
                }`}
                placeholder="Write your blog content here..."
                value={formData.content}
                onChange={handleChange}
                required
                maxLength={10000}
              />
              {validationErrors.content && (
                <label className="label">
                  <span className="label-text-alt text-error">{validationErrors.content}</span>
                </label>
              )}
            </div>

            {/* Preview Section */}
            {(formData.title || formData.content) && (
              <div className="divider">Preview</div>
            )}
            
            {formData.title && (
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">{formData.title}</h2>
                <div className="text-sm text-base-content/70 mb-4">
                  By {user?.name} • {blog && new Date(blog.createdAt).toLocaleDateString()}
                  {blog && <span> • Updated {new Date().toLocaleDateString()}</span>}
                </div>
              </div>
            )}
            
            {formData.content && (
              <div className="prose max-w-none mb-6 p-4 bg-base-200 rounded-lg">
                {formData.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p key={index} className="mb-2">
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="card-actions justify-between mt-6">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={handleCancel}
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`btn btn-primary ${submitting ? 'loading' : ''}`}
                disabled={submitting || !formData.title.trim() || !formData.content.trim()}
              >
                {submitting ? 'Updating...' : 'Update Blog'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Blog Info */}
      {blog && (
        <div className="mt-8">
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title text-lg mb-4">Blog Information</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold">Created:</span>
                  <span className="ml-2 text-base-content/70">
                    {new Date(blog.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Last Updated:</span>
                  <span className="ml-2 text-base-content/70">
                    {new Date(blog.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <div>
                  <span className="font-semibold">Likes:</span>
                  <span className="ml-2 text-base-content/70">{blog.likes?.length || 0}</span>
                </div>
                <div>
                  <span className="font-semibold">Dislikes:</span>
                  <span className="ml-2 text-base-content/70">{blog.dislikes?.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBlog;
