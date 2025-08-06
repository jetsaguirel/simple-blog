import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home page after logout
  };

  const openLoginModal = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };

  const openRegisterModal = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  const closeModals = () => {
    setShowLoginModal(false);
    setShowRegisterModal(false);
  };

  return (
    <div className="navbar bg-base-100 shadow-lg">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost text-xl">
          Simple Blog
        </Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {isAuthenticated && (
            <>
              <li>
                <Link to="/create-blog" className="btn btn-ghost">
                  Write Blog
                </Link>
              </li>
              <li>
                <Link to="/my-blogs" className="btn btn-ghost">
                  My Blogs
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      
      <div className="navbar-end">
        {isAuthenticated ? (
          <div className="flex items-center space-x-2">
            <Link to="/profile" className="btn btn-primary">
              Profile
            </Link>
            <button onClick={handleLogout} className="btn btn-outline btn-primary">
              Logout
            </button>
          </div>
        ) : (
          <div className="space-x-2">
            <button onClick={openLoginModal} className="btn btn-primary">
              Login
            </button>
            <button onClick={openRegisterModal} className="btn btn-outline btn-primary">
              Register
            </button>
          </div>
        )}
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal}
        onClose={closeModals}
        onSwitchToRegister={openRegisterModal}
      />

      {/* Register Modal */}
      <RegisterModal 
        isOpen={showRegisterModal}
        onClose={closeModals}
        onSwitchToLogin={openLoginModal}
      />
    </div>
  );
};

export default Navbar;
