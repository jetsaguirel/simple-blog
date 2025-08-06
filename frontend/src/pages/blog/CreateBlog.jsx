import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { blogService } from '../../services';

const CreateBlog = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await blogService.createBlog(formData);
      const blogId = response.data.blog?._id || response.data.data?._id || response.data._id;
      
      // Navigate to the created blog
      if (blogId) {
        navigate(`/blog/${blogId}`);
      } else {
        navigate('/my-blogs');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      setError(error.response?.data?.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (formData.title.trim() || formData.content.trim()) {
      if (window.confirm('Are you sure you want to cancel? Your changes will be lost.')) {
        navigate(-1);
      }
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-8">
        <nav className="text-sm breadcrumbs mb-4">
          <ul>
            <li><Link to="/" className="link link-primary">Home</Link></li>
            <li><Link to="/my-blogs" className="link link-primary">My Blogs</Link></li>
            <li className="text-base-content/70">Create New Blog</li>
          </ul>
        </nav>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Create New Blog</h1>
            <p className="text-base-content/70 mt-2">
              Share your thoughts and ideas with the community
            </p>
          </div>
          <div className="avatar">
            <div className="w-12 h-12 rounded-full bg-primary text-primary-content flex items-center justify-center">
              <span className="text-lg">{user?.name?.charAt(0)?.toUpperCase()}</span>
            </div>
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
              </label>
              <input
                type="text"
                name="title"
                placeholder="Enter an engaging title for your blog..."
                className="input input-bordered input-lg w-full"
                value={formData.title}
                onChange={handleChange}
                required
                maxLength={200}
              />
              <label className="label">
                <span className="label-text-alt">
                  {formData.title.length}/200 characters
                </span>
              </label>
            </div>

            {/* Content Textarea */}
            <div className="form-control w-full mb-6">
              <label className="label">
                <span className="label-text text-lg font-semibold">Blog Content</span>
              </label>
              <textarea
                name="content"
                className="textarea textarea-bordered w-full h-96"
                placeholder="Write your blog content here...

You can write multiple paragraphs, share your thoughts, experiences, or any interesting topic you'd like to discuss with the community.

Tips for great content:
- Start with an engaging introduction
- Use clear and concise language
- Break content into readable paragraphs
- End with a meaningful conclusion"
                value={formData.content}
                onChange={handleChange}
                required
                maxLength={10000}
              />
              <label className="label">
                <span className="label-text-alt">
                  {formData.content.length}/10,000 characters
                </span>
              </label>
            </div>

            {/* Preview Section */}
            {(formData.title || formData.content) && (
              <div className="divider">Preview</div>
            )}
            
            {formData.title && (
              <div className="mb-4">
                <h2 className="text-2xl font-bold mb-2">{formData.title}</h2>
                <div className="text-sm text-base-content/70 mb-4">
                  By {user?.name} • {new Date().toLocaleDateString()}
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
            <div className="card-actions justify-end mt-6">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`btn btn-primary ${loading ? 'loading' : ''}`}
                disabled={loading || !formData.title.trim() || !formData.content.trim()}
              >
                {loading ? 'Publishing...' : 'Publish Blog'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Writing Tips */}
      <div className="mt-8">
        <div className="card bg-base-200">
          <div className="card-body">
            <h3 className="card-title text-lg mb-4">Writing Tips</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2">📝 Content Quality</h4>
                <ul className="space-y-1 text-base-content/70">
                  <li>• Write original, valuable content</li>
                  <li>• Use proper grammar and spelling</li>
                  <li>• Structure your thoughts clearly</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎯 Engagement</h4>
                <ul className="space-y-1 text-base-content/70">
                  <li>• Create compelling titles</li>
                  <li>• Tell stories or share experiences</li>
                  <li>• Ask questions to engage readers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
