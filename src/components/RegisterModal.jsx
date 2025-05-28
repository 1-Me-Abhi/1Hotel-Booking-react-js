import React, { useState } from 'react';
import { FaUserPlus, FaTimes, FaEnvelope, FaPhone, FaLock, FaUser, FaMapMarkerAlt, FaCalendarAlt, FaGoogle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const RegisterModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    address: '',
    pincode: '',
    dateOfBirth: null,
    password: '',
    cpassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { register, googleLogin } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dateOfBirth: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (formData.password !== formData.cpassword) {
      setError('Passwords do not match');
      return;
    }
    
    // Check if all fields are filled
    for (const key in formData) {
      if (key !== 'cpassword' && !formData[key]) {
        setError('Please fill all required fields');
        return;
      }
    }
    
    try {
      setError('');
      setLoading(true);
      
      // Register user with backend API
      await register(
        formData.email,
        formData.password,
        formData.name,
        formData.phoneNumber,
        formData.address,
        formData.pincode,
        formData.dateOfBirth
      );
      
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
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
      <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl transition-all duration-300 transform">
        <div className="flex justify-between items-center p-6 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800">
          <h3 className="text-2xl font-bold flex items-center text-gray-800 dark:text-white">
            <FaUserPlus className="mr-3 text-custom-bg" /> Create Account
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
          
          <div className="flex justify-center mb-6">
            <button 
              type="button"
              onClick={handleGoogleSignUp}
              disabled={loading || googleLoading}
              className={`flex justify-center items-center bg-white hover:bg-gray-50 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-600 px-8 py-3 rounded-lg font-medium transition-colors shadow-sm hover:shadow-md ${googleLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              <FaGoogle className="mr-3 text-red-500" />
              {googleLoading ? 'Connecting...' : 'Sign up with Google'}
            </button>
          </div>
          
          <div className="flex items-center mb-6">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="mx-4 text-gray-500 dark:text-gray-400 text-sm">OR REGISTER WITH EMAIL</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                <FaUser className="inline mr-2 text-custom-bg" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white transition-all"
                placeholder="John Doe"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                <FaEnvelope className="inline mr-2 text-custom-bg" /> Email Address
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
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                <FaPhone className="inline mr-2 text-custom-bg" /> Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white transition-all"
                placeholder="1234567890"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                <FaMapMarkerAlt className="inline mr-2 text-custom-bg" /> Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white transition-all"
                placeholder="Your address"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                <FaMapMarkerAlt className="inline mr-2 text-custom-bg" /> PIN Code
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white transition-all"
                placeholder="ZIP/PIN code"
                required
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                <FaCalendarAlt className="inline mr-2 text-custom-bg" /> Date of Birth
              </label>
              <DatePicker
                selected={formData.dateOfBirth}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                maxDate={new Date()}
                minDate={new Date(1900, 0, 1)}
                placeholderText="Select your date of birth"
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white transition-all"
                required
              />
            </div>
            
            <div>
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
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2 font-medium">
                <FaLock className="inline mr-2 text-custom-bg" /> Confirm Password
              </label>
              <input
                type="password"
                name="cpassword"
                value={formData.cpassword}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white transition-all"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          
          <div className="flex justify-between items-center mt-8">
            <button 
              type="button" 
              onClick={onClose}
              disabled={loading || googleLoading}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white font-medium transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={loading || googleLoading}
              className={`bg-custom-bg hover:bg-custom-bg-dark text-white px-8 py-3 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterModal; 