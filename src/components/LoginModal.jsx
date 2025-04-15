import React, { useState } from 'react';
import { FaUserCircle, FaTimes, FaEnvelope, FaLock, FaGoogle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const LoginModal = ({ onClose, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login, googleLogin } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.email || !formData.password) {
      setError('Please fill all fields');
      return;
    }
    
    try {
      setError('');
      setLoading(true);
      await login(formData.email, formData.password);
      onClose();
    } catch (err) {
      setError(err.message.includes('Firebase') 
        ? 'Invalid email or password' 
        : err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError('');
      setGoogleLoading(true);
      await googleLogin();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl transition-all duration-300 transform">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
          <h3 className="text-2xl font-bold flex items-center text-gray-800 dark:text-white">
            <FaUserCircle className="mr-3 text-custom-bg" /> Welcome Back
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-200 rounded-lg border-l-4 border-red-500">
              {error}
            </div>
          )}
          
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              <FaEnvelope className="inline mr-2 text-custom-bg" /> Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white transition-all"
              placeholder="john@example.com"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              <FaLock className="inline mr-2 text-custom-bg" /> Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white transition-all"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full sm:w-auto bg-custom-bg hover:bg-custom-bg-dark text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
            
            <button 
              type="button"
              onClick={onForgotPassword}
              disabled={loading || googleLoading}
              className="text-custom-bg hover:text-custom-bg-dark dark:text-custom-bg dark:hover:text-custom-bg-dark font-medium transition-colors"
            >
              Forgot Password?
            </button>
          </div>
          
          <div className="mt-6 flex items-center">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="mx-4 text-gray-500 dark:text-gray-400 text-sm">OR</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          
          <div className="mt-6">
            <button 
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading || googleLoading}
              className={`w-full flex justify-center items-center bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 px-8 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md ${googleLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <FaGoogle className="mr-3 text-red-500" />
              {googleLoading ? 'Connecting...' : 'Sign in with Google'}
            </button>
          </div>
          
          <div className="mt-6 text-center text-gray-600 dark:text-gray-400">
            Don't have an account? <button type="button" onClick={() => { onClose(); document.querySelector('[data-register-button]')?.click(); }} className="text-custom-bg hover:text-custom-bg-dark font-medium">Create One</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal; 