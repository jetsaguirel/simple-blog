import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Page imports
import Home from '../pages/Home';
import BlogDetail from '../pages/blog/BlogDetail';
import CreateBlog from '../pages/blog/CreateBlog';
import EditBlog from '../pages/blog/EditBlog';
import MyBlogs from '../pages/blog/MyBlogs';
import UserProfile from '../pages/user/UserProfile';
import Profile from '../pages/user/Profile';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card bg-base-100 shadow-xl max-w-md">
          <div className="card-body text-center">
            <h2 className="card-title justify-center">Authentication Required</h2>
            <p className="text-base-content/70 mb-4">
              Please log in to access this page.
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/blog/:id" element={<BlogDetail />} />
      <Route path="/user/:id" element={<UserProfile />} />
      
      {/* Protected Routes */}
      <Route 
        path="/create-blog" 
        element={
          <ProtectedRoute>
            <CreateBlog />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/edit-blog/:id" 
        element={
          <ProtectedRoute>
            <EditBlog />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/my-blogs" 
        element={
          <ProtectedRoute>
            <MyBlogs />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      
      {/* 404 Route */}
      <Route 
        path="*" 
        element={
          <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
              <p className="text-base-content/70 mb-4">
                The page you're looking for doesn't exist.
              </p>
              <a href="/" className="btn btn-primary">
                Go Home
              </a>
            </div>
          </div>
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
