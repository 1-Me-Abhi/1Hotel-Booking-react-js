import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar, FaBed, FaUsers, FaChild, FaArrowRight } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import LoginModal from './LoginModal';
import { motion } from 'framer-motion';

const RoomCard = ({ room }) => {
  const {
    id,
    name,
    price,
    features,
    facilities,
    image,
    adult,
    children,
    rating
  } = room;
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleBooking = () => {
    if (isLoggedIn) {
      navigate(`/room/${id}`);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLogin = (userData) => {
    login(userData);
    setShowLoginModal(false);
    navigate(`/room/${id}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="col-span-1 my-3"
    >
      <motion.div 
        whileHover={{ y: -10 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        className="overflow-hidden bg-white dark:bg-gray-800 backdrop-blur-sm border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl rounded-2xl max-w-sm mx-auto transition-all duration-300"
      >
        <div className="relative overflow-hidden group">
          <motion.img 
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
            src={image || 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'} 
            alt={name}
            className="h-60 w-full object-cover transition-transform duration-500"
          />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-4 right-4 text-white"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">View Details</span>
              <FaArrowRight className="text-sm" />
            </div>
          </motion.div>
          
          <div className="absolute top-4 right-4">
            <div className="flex items-center bg-white/80 dark:bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-custom-bg font-bold mr-1">₹{price}</span>
              <span className="text-gray-700 dark:text-gray-300 text-xs">/night</span>
            </div>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h5 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h5>
            <div className="flex">
              {[...Array(Math.round(rating))].map((_, i) => (
                <FaStar key={i} className="text-yellow-500" />
              ))}
            </div>
          </div>
          
          <div className="flex items-center mb-4 text-gray-600 dark:text-gray-400 text-sm">
            <div className="flex items-center mr-4">
              <FaUsers className="mr-1" />
              <span>{adult} Adults</span>
            </div>
            <div className="flex items-center">
              <FaChild className="mr-1" />
              <span>{children} Children</span>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {features.slice(0, 3).map((feature) => (
                <span 
                  key={feature}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full"
                >
                  {feature}
                </span>
              ))}
              {features.length > 3 && (
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full">
                  +{features.length - 3} more
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {facilities.slice(0, 3).map((facility) => (
                <span 
                  key={facility}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full"
                >
                  {facility}
                </span>
              ))}
              {facilities.length > 3 && (
                <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs rounded-full">
                  +{facilities.length - 3} more
                </span>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <Link 
              to={`/room/${id}`} 
              className="text-custom-bg hover:text-custom-bg-dark dark:hover:text-custom-bg font-medium text-sm transition-colors duration-300"
            >
              View Details
            </Link>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-custom-bg hover:bg-custom-bg-dark text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 text-sm font-medium"
              onClick={handleBooking}
            >
              Book Now
            </motion.button>
          </div>
        </div>
      </motion.div>

      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onLogin={handleLogin}
          onForgotPassword={() => {
            // Handle forgot password here
            setShowLoginModal(false);
          }}
        />
      )}
    </motion.div>
  );
};

export default RoomCard; 