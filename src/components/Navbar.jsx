import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import ForgotPasswordModal from './ForgotPasswordModal';
import ThemeToggle from './ThemeToggle';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isLoggedIn, userName, userPic, logout, loading, isAdmin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setDropdownOpen(false);
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    setDropdownOpen(false);
  };

  const handleBookingsClick = () => {
    navigate('/bookings');
    setDropdownOpen(false);
  };

  const handleAdminClick = () => {
    navigate('/admin');
    setDropdownOpen(false);
  };

  // Animation variants
  const navbarVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  const linkVariants = {
    hover: { scale: 1.05, x: 5, transition: { duration: 0.2 } }
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 22
      }
    }
  };

  return (
    <motion.nav 
      initial="initial"
      animate="animate"
      variants={navbarVariants}
      className={`${scrolled ? 'backdrop-blur-md bg-white/80 dark:bg-gray-900/80' : 'bg-white dark:bg-gray-900'} 
        px-6 py-3 sticky top-0 z-50 transition-all duration-300
        ${scrolled ? 'shadow-lg dark:shadow-gray-800/30' : 'shadow-md dark:shadow-gray-800/10'}`}
    >
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <Link to="/" className="text-2xl font-bold font-merienda text-gray-800 dark:text-gray-100 hover:text-custom-bg dark:hover:text-custom-bg transition-all duration-300">
          Hotel Booking
        </Link>
        
        <div className="flex items-center lg:hidden">
          <ThemeToggle />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="ml-4 p-1 rounded-full text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

        <AnimatePresence>
          <div 
            className={`${mobileMenuOpen ? 'flex' : 'hidden'} w-full lg:flex lg:items-center lg:w-auto mt-4 lg:mt-0 flex-col lg:flex-row`}
          >
            <ul className="lg:flex space-y-2 lg:space-y-0 lg:space-x-6 w-full lg:w-auto">
              {['Home', 'Rooms', 'Facilities', 'Contact', 'About'].map((item, index) => (
                <motion.li key={index} whileHover="hover" variants={linkVariants}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className={`block py-2 text-gray-700 dark:text-gray-200 hover:text-custom-bg dark:hover:text-custom-bg transition-all duration-300
                      ${location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) ? 'font-medium text-custom-bg' : ''}`}
                  >
                    {item === 'Contact' ? 'Contact us' : item}
                    {location.pathname === (item === 'Home' ? '/' : `/${item.toLowerCase()}`) && (
                      <motion.div 
                        className="h-0.5 bg-custom-bg mt-0.5" 
                        layoutId="navbar-underline"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                </motion.li>
              ))}
            </ul>
            
            <div className="mt-4 lg:mt-0 lg:ml-6 flex items-center w-full lg:w-auto justify-end">
              <div className="hidden lg:block mr-4">
                <ThemeToggle />
              </div>
              
              {isLoggedIn ? (
                <div className="relative w-full lg:w-auto" ref={dropdownRef}>
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 border border-gray-300 dark:border-gray-600 rounded-full px-3 py-1.5 text-gray-800 dark:text-gray-100 hover:border-custom-bg dark:hover:border-custom-bg transition-all duration-300 w-full lg:w-auto justify-center lg:justify-start"
                  >
                    {userPic ? (
                      <img src={userPic} alt={userName} className="w-7 h-7 rounded-full" />
                    ) : (
                      <FaUserCircle className="w-7 h-7" />
                    )}
                    <span>{userName}</span>
                    <FaChevronDown className={`transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                  </motion.button>
                  
                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div 
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={dropdownVariants}
                        className="absolute right-0 mt-2 w-48 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md shadow-lg dark:shadow-gray-900/30 rounded-xl py-2 border border-gray-100 dark:border-gray-700 z-10"
                      >
                        <button 
                          onClick={handleProfileClick}
                          className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:pl-6"
                        >
                          Profile
                        </button>
                        <button 
                          onClick={handleBookingsClick}
                          className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:pl-6"
                        >
                          Bookings
                        </button>
                        {isAdmin && (
                          <button 
                            onClick={handleAdminClick}
                            className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:pl-6"
                          >
                            Admin Dashboard
                          </button>
                        )}
                        <button 
                          onClick={handleLogout} 
                          className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-200 hover:pl-6"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="flex space-x-3 w-full lg:w-auto justify-center">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowLoginModal(true)} 
                    className="border border-gray-300 dark:border-gray-600 rounded-full px-5 py-1.5 text-gray-800 dark:text-gray-200 hover:border-custom-bg dark:hover:border-custom-bg hover:shadow-md transition-all duration-300"
                  >
                    Login
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowRegisterModal(true)}
                    className="bg-custom-bg text-white rounded-full px-5 py-1.5 hover:bg-custom-bg-dark shadow-md hover:shadow-lg transition-all duration-300"
                    data-register-button
                  >
                    Register
                  </motion.button>
                </div>
              )}
            </div>
          </div>
        </AnimatePresence>
      </div>

      {/* Modals */}
      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onForgotPassword={() => {
            setShowLoginModal(false);
            setShowForgotModal(true);
          }}
        />
      )}
      
      {showRegisterModal && (
        <RegisterModal 
          onClose={() => setShowRegisterModal(false)} 
        />
      )}
      
      {showForgotModal && (
        <ForgotPasswordModal 
          onClose={() => setShowForgotModal(false)}
          onBackToLogin={() => {
            setShowForgotModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </motion.nav>
  );
};

export default Navbar; 