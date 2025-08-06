import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Modal from './Modal';

const LoginModal = ({ isOpen, onClose, onSwitchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('LoginModal - Starting login attempt...'); // Debug log

    try {
      const result = await login(formData);
      
      console.log('LoginModal - Login result:', result); // Debug log
      
      if (result.success) {
        console.log('LoginModal - Login successful, closing modal'); // Debug log
        onClose();
        // Reset form
        setFormData({ email: '', password: '' });
        setError(''); // Clear any previous errors
      } else {
        console.log('LoginModal - Login failed, setting error:', result.error); // Debug log
        setError(result.error || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('LoginModal - Unexpected error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setFormData({ email: '', password: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Sign In to Simple Blog">
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control w-full mb-6">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="input input-bordered w-full"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-control">
          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </form>

      <div className="divider">OR</div>

      <div className="text-center">
        <p className="text-sm">
          Don't have an account?{' '}
          <button 
            className="link link-primary"
            onClick={onSwitchToRegister}
          >
            Create one here
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default LoginModal;
