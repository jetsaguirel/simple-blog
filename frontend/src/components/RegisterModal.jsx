import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import Modal from './Modal';

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { register } = useAuth();

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

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    // Validate password length
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const { confirmPassword, ...registerData } = formData;
      const result = await register(registerData);
      
      if (result.success) {
        onClose();
        // Reset form
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setError(''); // Clear any previous errors
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('RegisterModal - Unexpected error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setError('');
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Join Simple Blog">
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className="input input-bordered w-full"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

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

        <div className="form-control w-full mb-4">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            className="input input-bordered w-full"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
          <label className="label">
            <span className="label-text-alt">
              Password must be at least 6 characters
            </span>
          </label>
        </div>

        <div className="form-control w-full mb-6">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            className="input input-bordered w-full"
            value={formData.confirmPassword}
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
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </div>
      </form>

      <div className="divider">OR</div>

      <div className="text-center">
        <p className="text-sm">
          Already have an account?{' '}
          <button 
            className="link link-primary"
            onClick={onSwitchToLogin}
          >
            Sign in here
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default RegisterModal;
