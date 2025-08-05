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
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="avatar placeholder">
                <div className="bg-neutral text-neutral-content w-10 rounded-full">
                  <span className="text-xl">{user?.name?.charAt(0)?.toUpperCase() || 'U'}</span>
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <div className="justify-between">
                  {user?.name}
                  <span className="badge">Profile</span>
                </div>
              </li>
              <li>
                <Link to="/profile">Settings</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
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
