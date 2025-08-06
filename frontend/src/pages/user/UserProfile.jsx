import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { userService, blogService } from '../../services';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import useDocumentTitle from '../../hooks/useDocumentTitle';

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set dynamic title based on user name
  useDocumentTitle(user?.name ? `${user.name}'s Profile` : 'User Profile');

  useEffect(() => {
    fetchUserData();
  }, [id]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      
      // Fetch user profile and their blogs in parallel
      const [userResponse, blogsResponse] = await Promise.all([
        userService.getUserProfile(id),
        blogService.getUserBlogs(id)
      ]);
      
      setUser(userResponse.data.user || userResponse.data.data || userResponse.data);
      setBlogs(blogsResponse.data.blogs || blogsResponse.data.data || blogsResponse.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error.response?.data?.message || 'Failed to fetch user profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading user profile..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchUserData} />;
  }

  if (!user) {
    return <ErrorMessage message="User not found" />;
  }

  const totalLikes = blogs.reduce((sum, blog) => sum + (blog.likes?.length || 0), 0);
  const totalEngagement = blogs.reduce((sum, blog) => sum + (blog.likes?.length || 0) + (blog.dislikes?.length || 0), 0);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm breadcrumbs mb-6">
        <ul>
          <li><Link to="/" className="link link-primary">Home</Link></li>
          <li className="text-base-content/70">{user.name}'s Profile</li>
        </ul>
      </nav>

      {/* User Profile Header */}
      <div className="card bg-base-100 shadow-xl mb-8">
        <div className="card-body">
          <div className="flex items-center space-x-6">
            {/* Avatar */}
            <div className="avatar">
              <div className="w-24 h-24 rounded-full bg-primary text-primary-content flex items-center justify-center">
                <span className="text-3xl font-bold">
                  {user.name?.charAt(0)?.toUpperCase()}
                </span>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
              <p className="text-base-content/70 mb-4">{user.email}</p>
              
              <div className="flex space-x-6 text-sm">
                <div>
                  <span className="font-semibold">Member since:</span>
                  <span className="ml-2">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Published Blogs</div>
          <div className="stat-value text-primary">{blogs.length}</div>
          <div className="stat-desc">Total articles</div>
        </div>
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Total Likes</div>
          <div className="stat-value text-secondary">{totalLikes}</div>
          <div className="stat-desc">Across all blogs</div>
        </div>
        <div className="stat bg-base-100 shadow rounded-lg">
          <div className="stat-title">Engagement</div>
          <div className="stat-value text-accent">{totalEngagement}</div>
          <div className="stat-desc">Total interactions</div>
        </div>
      </div>

      {/* User's Blogs */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">
          {user.name}'s Blogs ({blogs.length})
        </h2>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-2xl font-bold mb-2">No blogs yet</h3>
          <p className="text-base-content/70">
            {user.name} hasn't published any blogs yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div key={blog._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
              <div className="card-body">
                <h2 className="card-title">
                  <Link to={`/blog/${blog._id}`} className="hover:link">
                    {blog.title}
                  </Link>
                  <div className="badge badge-secondary">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </div>
                </h2>
                
                <p className="line-clamp-3 text-base-content/70">
                  {blog.content.length > 150 
                    ? `${blog.content.substring(0, 150)}...` 
                    : blog.content
                  }
                </p>
                
                <div className="card-actions justify-between items-center mt-4">
                  <div className="flex space-x-3 text-sm text-base-content/60">
                    <span className="flex items-center space-x-1">
                      <span>👍</span>
                      <span>{blog.likes?.length || 0}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <span>👎</span>
                      <span>{blog.dislikes?.length || 0}</span>
                    </span>
                  </div>
                  
                  <Link to={`/blog/${blog._id}`} className="btn btn-primary btn-sm">
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back to Home */}
      <div className="mt-8 text-center">
        <Link to="/" className="btn btn-primary">
          Back to All Blogs
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
