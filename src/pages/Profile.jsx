import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaAddressCard, FaBirthdayCake, FaMapMarkerAlt, FaKey, FaLock, FaEdit, FaSignOutAlt, FaCalendarCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Create a new ErrorBanner component to properly handle error display
const ErrorBanner = ({ message, onDismiss }) => {
  if (!message) return null;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 p-4 rounded-xl mb-6 flex items-center"
    >
      <div className="bg-red-200 dark:bg-red-800 rounded-full p-1 mr-2">
        <svg className="w-5 h-5 text-red-700 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </div>
      <div className="flex-1">{message}</div>
      {onDismiss && (
        <button onClick={onDismiss} className="ml-2">
          <svg className="w-5 h-5 text-red-700 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      )}
    </motion.div>
  );
};

const API_URL = 'http://localhost:5000/api';

const Profile = () => {
  const navigate = useNavigate();
  const { isLoggedIn, currentUser, logout, refreshUserData } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phonenum: '',
    address: '',
    pincode: '',
    dob: null,
    profilePic: 'https://randomuser.me/api/portraits/men/73.jpg' // Default picture
  });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phonenum: '',
    address: '',
    pincode: '',
    dob: null
  });
  
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });
  
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [fetchingData, setFetchingData] = useState(true);
  
  // Error dismissal handler
  const dismissError = () => {
    setErrorMessage('');
  };

  // Load user data when component mounts
  useEffect(() => {
    const loadUserData = async () => {
      if (!currentUser) {
        setFetchingData(false);
        return;
      }
      
      try {
        setFetchingData(true);
        setErrorMessage('');
        
        // Set profile data from current user
        setProfileData({
          name: currentUser.name || '',
          email: currentUser.email || '',
          phonenum: currentUser.phoneNumber || '',
          address: currentUser.address || '',
          pincode: currentUser.pincode || '',
          dob: currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth) : null,
          profilePic: currentUser.profilePicture || 'https://randomuser.me/api/portraits/men/73.jpg'
        });
        
        // Set initial form data
        setFormData({
          name: currentUser.name || '',
          email: currentUser.email || '',
          phonenum: currentUser.phoneNumber || '',
          address: currentUser.address || '',
          pincode: currentUser.pincode || '',
          dob: currentUser.dateOfBirth ? new Date(currentUser.dateOfBirth) : null
        });
        
        setErrorMessage('');
        
      } catch (error) {
        console.error("Error loading user data:", error);
        setErrorMessage("Failed to load your profile data. Please refresh and try again.");
      } finally {
        setFetchingData(false);
      }
    };

    if (isLoggedIn) {
      loadUserData();
    } else {
      navigate('/');
    }
  }, [isLoggedIn, currentUser, navigate]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };
  
  const handleDateChange = (date) => {
    setFormData(prev => ({ ...prev, dob: date }));
    if (errorMessage) setErrorMessage('');
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };
  
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/users/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: formData.name,
          phoneNumber: formData.phonenum,
          address: formData.address,
          pincode: formData.pincode,
          dateOfBirth: formData.dob ? formData.dob.toISOString().split('T')[0] : null
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      // Refresh user data from the server
      await refreshUserData();
      
      setSuccessMessage('Profile updated successfully!');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');
    
    try {
      if (passwordData.new !== passwordData.confirm) {
        throw new Error('New passwords do not match');
      }

      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/auth/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          currentPassword: passwordData.current,
          newPassword: passwordData.new
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update password');
      }
      
      setSuccessMessage('Password updated successfully!');
      setPasswordData({ current: '', new: '', confirm: '' });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  // Create a ProfilePage component to handle the UI rendering
  const ProfilePage = () => (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-12"
    >
      <motion.h2 
        variants={itemVariants} 
        className="text-3xl font-bold text-center mb-12 h-font dark:text-white"
      >
        MY PROFILE
      </motion.h2>
      
      <motion.div 
        variants={itemVariants}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl dark:shadow-gray-900/30 overflow-hidden border border-gray-100 dark:border-gray-700"
      >
        <div className="lg:flex">
          {/* Sidebar */}
          <div className="lg:w-1/3 bg-gray-50/80 dark:bg-gray-700/50 p-6 lg:border-r border-gray-200 dark:border-gray-600">
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <img 
                  src={profileData.profilePic} 
                  alt={profileData.name || "User"}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white dark:border-gray-600 shadow-lg"
                />
                {profileData.createdAt && (
                  <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                    Member since {new Date(profileData.createdAt.seconds * 1000).toLocaleDateString()}
                  </div>
                )}
                <motion.div 
                  whileHover={{ scale: 1.2 }}
                  className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md cursor-pointer"
                >
                  <FaEdit className="text-custom-bg" />
                </motion.div>
              </div>
              <h3 className="text-xl font-semibold mt-4 dark:text-white">{profileData.name || "User"}</h3>
              <p className="text-gray-600 dark:text-gray-300">{profileData.email || "No email"}</p>
            </div>
            
            <div className="space-y-3">
              <motion.button 
                whileHover={{ x: 5 }}
                onClick={() => setActiveTab('profile')}
                className={`w-full text-left py-3 px-4 rounded-xl flex items-center transition-all duration-300 ${
                  activeTab === 'profile' 
                    ? 'bg-custom-bg text-white shadow-md' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200'
                }`}
              >
                <FaUser className={`mr-3 ${activeTab === 'profile' ? 'text-white' : 'text-custom-bg'}`} />
                Profile Settings
              </motion.button>
              
              <motion.button 
                whileHover={{ x: 5 }}
                onClick={() => setActiveTab('password')}
                className={`w-full text-left py-3 px-4 rounded-xl flex items-center transition-all duration-300 ${
                  activeTab === 'password' 
                    ? 'bg-custom-bg text-white shadow-md' 
                    : 'hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200'
                }`}
              >
                <FaLock className={`mr-3 ${activeTab === 'password' ? 'text-white' : 'text-custom-bg'}`} />
                Change Password
              </motion.button>
              
              <motion.button 
                whileHover={{ x: 5 }}
                onClick={() => navigate('/bookings')}
                className="w-full text-left py-3 px-4 rounded-xl flex items-center hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 transition-all duration-300"
              >
                <FaCalendarCheck className="mr-3 text-custom-bg" />
                My Bookings
              </motion.button>
              
              <motion.button 
                whileHover={{ x: 5 }}
                onClick={handleLogout}
                className="w-full text-left py-3 px-4 rounded-xl flex items-center hover:bg-gray-200 dark:hover:bg-gray-600 dark:text-gray-200 transition-all duration-300 mt-8"
              >
                <FaSignOutAlt className="mr-3 text-red-500" />
                <span className="text-red-500">Logout</span>
              </motion.button>
            </div>
          </div>
          
          {/* Content */}
          <div className="lg:w-2/3 p-8">
            {successMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-100 dark:bg-green-900/60 text-green-700 dark:text-green-300 p-4 rounded-xl mb-6 flex items-center"
              >
                <div className="bg-green-200 dark:bg-green-800 rounded-full p-1 mr-2">
                  <svg className="w-5 h-5 text-green-700 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                {successMessage}
              </motion.div>
            )}
            
            <ErrorBanner message={errorMessage} onDismiss={dismissError} />
            
            {activeTab === 'profile' ? (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <h3 className="text-xl font-bold mb-6 dark:text-white">Profile Information</h3>
                <form onSubmit={handleProfileUpdate} className="space-y-5">
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <FaUser className="mr-2 text-custom-bg" /> Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleProfileChange}
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <FaEnvelope className="mr-2 text-custom-bg" /> Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleProfileChange}
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white cursor-not-allowed opacity-75"
                      required
                      disabled
                      title="Email cannot be changed"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Email cannot be changed</p>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <FaPhone className="mr-2 text-custom-bg" /> Phone
                    </label>
                    <input
                      type="tel"
                      name="phonenum"
                      value={formData.phonenum}
                      onChange={handleProfileChange}
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <FaAddressCard className="mr-2 text-custom-bg" /> Address
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleProfileChange}
                      rows="3"
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                      required
                    ></textarea>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-custom-bg" /> Pincode
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleProfileChange}
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <FaBirthdayCake className="mr-2 text-custom-bg" /> Date of Birth
                    </label>
                    <DatePicker
                      selected={formData.dob}
                      onChange={handleDateChange}
                      dateFormat="dd/MM/yyyy"
                      showYearDropdown
                      showMonthDropdown
                      dropdownMode="select"
                      maxDate={new Date()}
                      minDate={new Date(1900, 0, 1)}
                      placeholderText="Select your date of birth"
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className={`w-full sm:w-auto bg-custom-bg hover:bg-custom-bg-dark text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <FaEdit className="mr-2" />
                      )}
                      <span>{loading ? 'Updating...' : 'Update Profile'}</span>
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <h3 className="text-xl font-bold mb-6 dark:text-white">Change Password</h3>
                <form onSubmit={handlePasswordUpdate} className="space-y-5">
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <FaKey className="mr-2 text-custom-bg" /> Current Password
                    </label>
                    <input
                      type="password"
                      name="current"
                      value={passwordData.current}
                      onChange={handlePasswordChange}
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <FaKey className="mr-2 text-custom-bg" /> New Password
                    </label>
                    <input
                      type="password"
                      name="new"
                      value={passwordData.new}
                      onChange={handlePasswordChange}
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                      required
                      minLength="6"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Password must be at least 6 characters</p>
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label className="block text-gray-700 dark:text-gray-300 mb-2 flex items-center">
                      <FaKey className="mr-2 text-custom-bg" /> Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirm"
                      value={passwordData.confirm}
                      onChange={handlePasswordChange}
                      className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className={`w-full sm:w-auto bg-custom-bg hover:bg-custom-bg-dark text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {loading ? (
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      ) : (
                        <FaLock className="mr-2" />
                      )}
                      <span>{loading ? 'Updating...' : 'Update Password'}</span>
                    </motion.button>
                  </motion.div>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
  
  if (!isLoggedIn && !loading) {
    navigate('/');
    return null;
  }
  
  if (loading || fetchingData) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh]">
        <div className="w-16 h-16 border-4 border-custom-bg border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading your profile data...</p>
      </div>
    );
  }
  
  // Handle the case where the user is logged in but no profile data is available yet
  if (isLoggedIn && !profileData.email) {
    return (
      <div className="container mx-auto flex flex-col justify-center items-center min-h-[80vh] px-4">
        <div className="p-8 max-w-lg w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Profile Data Unavailable</h2>
          <div className="bg-red-100 dark:bg-red-900/60 text-red-700 dark:text-red-300 p-4 rounded-xl mb-6 flex items-center">
            <div className="bg-red-200 dark:bg-red-800 rounded-full p-1 mr-2">
              <svg className="w-5 h-5 text-red-700 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            We're having trouble loading your profile data. This could be due to a network issue or a problem with our servers.
          </div>
          
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            Try the following steps:
          </p>
          
          <ul className="list-disc pl-5 mb-6 text-gray-700 dark:text-gray-300 space-y-2">
            <li>Check your internet connection</li>
            <li>Clear your browser cache</li>
            <li>Try logging out and logging back in</li>
          </ul>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => window.location.reload()} 
              className="bg-custom-bg hover:bg-custom-bg-dark text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Refresh Page
            </button>
            
            <button 
              onClick={handleLogout} 
              className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center justify-center"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Return the main profile page if everything is ok
  return <ProfilePage />;
};

export default Profile; 