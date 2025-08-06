import React, { useState, useEffect } from 'react';
import { blogService } from '../services';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import RegisterModal from '../components/RegisterModal';
import LoginModal from '../components/LoginModal';
import { BlogCard } from '../components';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await blogService.getAllBlogs();
      setBlogs(response.data.blogs);
    } catch (error) {
      setError('Failed to fetch blogs');
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (blogId) => {
    try {
      await blogService.likeBlog(blogId);
      // Refresh blogs to get updated like counts
      fetchBlogs();
    } catch (error) {
      console.error('Error liking blog:', error);
    }
  };

  const handleDislike = async (blogId) => {
    try {
      await blogService.dislikeBlog(blogId);
      // Refresh blogs to get updated dislike counts
      fetchBlogs();
    } catch (error) {
      console.error('Error disliking blog:', error);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId);
      // Remove the deleted blog from the current list
      setBlogs(blogs.filter(blog => blog._id !== blogId));
    } catch (error) {
      console.error('Error deleting blog:', error);
      alert('Failed to delete blog. Please try again.');
    }
  };

  const openRegisterModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const openLoginModal = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="alert alert-error">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="hero bg-base-200 rounded-lg mb-8">
        <div className="hero-content text-center">
          <div className="max-w-md">
            {isAuthenticated ? (
              <>
                <h1 className="text-5xl font-bold">Welcome back, {user?.name}! 👋</h1>
                <p className="py-6">
                  Ready to share your thoughts with the world? Your next great story is just a click away.
                </p>
                <Link to="/create-blog" className="btn btn-primary btn-lg">
                  ✍️ Write New Blog
                </Link>
              </>
            ) : (
              <>
                <h1 className="text-5xl font-bold">Welcome to Simple Blog</h1>
                <p className="py-6">
                  Discover amazing stories, insights, and perspectives from our community of writers.
                </p>
                <button onClick={openRegisterModal} className="btn btn-primary">
                  Join the Community
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Latest Blog Posts</h2>
        <div className="badge badge-info">
          {blogs.length} {blogs.length === 1 ? 'post' : 'posts'}
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold mb-2">No blogs yet</h3>
          <p className="text-base-content/70 mb-4">
            {isAuthenticated 
              ? "You could be the first to share your story with the community!"
              : "Be the first to share your story with the community!"
            }
          </p>
          {isAuthenticated ? (
            <Link to="/create-blog" className="btn btn-primary">
              Write First Blog
            </Link>
          ) : (
            <button onClick={openRegisterModal} className="btn btn-primary">
              Get Started
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard
              key={blog._id}
              blog={blog}
              onLike={handleLike}
              onDislike={handleDislike}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Register Modal */}
      <RegisterModal 
        isOpen={showRegisterModal}
        onClose={closeModals}
        onSwitchToLogin={openLoginModal}
      />

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={closeModals}
        onSwitchToRegister={openRegisterModal}
      />
    </div>
  );
};

export default Home;
