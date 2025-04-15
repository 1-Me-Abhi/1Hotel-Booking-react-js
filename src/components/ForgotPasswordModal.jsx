import React, { useState } from 'react';
import { FaKey, FaTimes, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const ForgotPasswordModal = ({ onClose, onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email');
      setIsSuccess(false);
      return;
    }
    
    try {
      setLoading(true);
      await resetPassword(email);
      setMessage('A password reset link has been sent to your email.');
      setIsSuccess(true);
      
      // Close the modal after a delay
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (err) {
      setMessage(err.message.includes('Firebase') 
        ? 'Error sending reset email. Please check your email address.' 
        : err.message);
      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl transition-all duration-300 transform">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
          <h3 className="text-2xl font-bold flex items-center text-gray-800 dark:text-white">
            <FaKey className="mr-3 text-custom-bg" /> Reset Password
          </h3>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-6">
          {message && (
            <div className={`mb-6 p-4 rounded-lg border-l-4 ${isSuccess ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-200 border-green-500' : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-200 border-red-500'}`}>
              {message}
            </div>
          )}
          
          <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-sm text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-600">
            Enter your email address below. We'll send you a link to reset your password.
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
              <FaEnvelope className="inline mr-2 text-custom-bg" /> Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white transition-all"
              placeholder="john@example.com"
              required
            />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <button 
              type="button"
              onClick={onBackToLogin}
              disabled={loading}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white font-medium transition-colors"
            >
              Back to Login
            </button>
            
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full sm:w-auto bg-custom-bg hover:bg-custom-bg-dark text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Sending...' : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal; 