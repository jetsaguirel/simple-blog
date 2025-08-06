import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { formatDate, getExcerpt } from '../utils';

const BlogCard = ({ 
  blog, 
  onLike, 
  onDislike, 
  onDelete, 
  showActions = true, 
  showAuthor = true,
  compact = false 
}) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!blog) return null;
  
  // Handle both _id and id fields for user and blog author
  const userId = user?._id || user?.id;
  const blogAuthorId = blog.author?._id || blog.author?.id;
  const isOwner = isAuthenticated && userId && blogAuthorId && userId.toString() === blogAuthorId.toString();
  
  // Handle both _id and id fields for likes/dislikes arrays
  const isLiked = blog.likes?.includes(userId);
  const isDisliked = blog.dislikes?.includes(userId);

  const handleLike = async (e) => {
    e.preventDefault();
    if (onLike) await onLike(blog._id);
  };

  const handleDislike = async (e) => {
    e.preventDefault();
    if (onDislike) await onDislike(blog._id);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (onDelete && window.confirm(`Are you sure you want to delete "${blog.title}"?`)) {
      await onDelete(blog._id);
    }
  };

  const cardClass = compact 
    ? "card bg-base-100 shadow-lg hover:shadow-xl transition-shadow"
    : "card bg-base-100 shadow-xl";

  return (
    <div className={cardClass}>
      <div className="card-body">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {/* Title */}
            <h2 className={`card-title ${compact ? 'text-lg' : 'text-xl'} mb-2`}>
              <Link to={`/blog/${blog._id}`} className="hover:link">
                {blog.title}
              </Link>
              <div className="badge badge-secondary">
                {formatDate(blog.createdAt)}
              </div>
            </h2>
            
            {/* Author */}
            {showAuthor && (
              <p className="text-sm text-base-content/70 mb-2">
                By:{' '}
                <Link 
                  to={`/user/${blog.author?._id}`} 
                  className="link link-primary hover:link-secondary"
                >
                  {blog.author?.name}
                </Link>
              </p>
            )}
            
            {/* Content Preview */}
            <p className={`text-base-content/80 mb-4 ${compact ? 'line-clamp-2' : 'line-clamp-3'}`}>
              {getExcerpt(blog.content, compact ? 150 : 200)}
            </p>
            
            {/* Update info */}
            {blog.updatedAt !== blog.createdAt && (
              <p className="text-xs text-base-content/60 mb-4">
                Updated: {formatDate(blog.updatedAt)}
              </p>
            )}
          </div>

          {/* Owner Actions */}
          {isOwner && showActions && (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </div>
              <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-40 p-2 shadow">
                <li>
                  <Link to={`/edit-blog/${blog._id}`} className="text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={handleDelete}
                    className="text-error text-sm"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="card-actions justify-between items-center">
          <div className="flex space-x-3">
            {isAuthenticated && showActions ? (
              <>
                <button 
                  className={`btn btn-sm ${isLiked ? 'btn-primary' : 'btn-outline'}`}
                  onClick={handleLike}
                >
                  <span className="mr-1">👍</span>
                  {blog.likes?.length || 0}
                </button>
                <button 
                  className={`btn btn-sm ${isDisliked ? 'btn-error' : 'btn-outline'}`}
                  onClick={handleDislike}
                >
                  <span className="mr-1">👎</span>
                  {blog.dislikes?.length || 0}
                </button>
              </>
            ) : (
              <div className="flex space-x-3 text-sm text-base-content/70">
                <span className="flex items-center space-x-1">
                  <span>👍</span>
                  <span>{blog.likes?.length || 0}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <span>👎</span>
                  <span>{blog.dislikes?.length || 0}</span>
                </span>
                {!isAuthenticated && <span className="text-xs">Login to interact</span>}
              </div>
            )}
          </div>
          
          <Link to={`/blog/${blog._id}`} className="btn btn-primary btn-sm">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
