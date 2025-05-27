import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useAuth } from '../context/AuthContext';
import LoginModal from '../components/LoginModal';
import { motion } from 'framer-motion';
import PageTransition from '../components/PageTransition';
import axios from 'axios';

// Animation variants
const imageVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.5 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const { isLoggedIn, login } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/rooms/${id}`);
        if (response.data) {
          // Transform the room data to match the expected structure
          const transformedRoom = {
            ...response.data,
            features: response.data.amenities || [],
            facilities: ['AC', 'Room Service', 'TV'], // Add default facilities
            reviews: response.data.reviews || [],
            rating: response.data.rating || 4
          };
          setRoom(transformedRoom);
        } else {
          setError('Room not found');
        }
      } catch (error) {
        console.error('Error fetching room:', error);
        setError('Failed to load room details');
      } finally {
        setLoading(false);
      }
    };

    fetchRoomData();
  }, [id]);

  const handlePrevImage = () => {
    if (!room?.images?.length) return;
    setCurrentImageIndex(prev => 
      prev === 0 ? room.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    if (!room?.images?.length) return;
    setCurrentImageIndex(prev => 
      prev === room.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleBooking = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    
    if (!checkInDate || !checkOutDate) {
      alert('Please select check-in and check-out dates');
      return;
    }
    
    if (!room) return;
    
    // Create booking data to send to checkout page
    const bookingData = {
      roomId: room._id,
      roomName: room.type,
      roomPrice: room.price,
      checkInDate: checkInDate,
      checkOutDate: checkOutDate,
      adult: adult,
      children: children,
      roomImage: room.images?.[0] || ''
    };
    
    // Navigate to checkout with booking data
    navigate('/checkout', { state: { bookingData } });
  };

  const handleLogin = (userData) => {
    login(userData);
    setShowLoginModal(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-custom-bg border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 py-8 text-center"
      >
        <motion.h2 
          className="text-2xl font-semibold mb-4 dark:text-white"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {error || 'Room Not Found'}
        </motion.h2>
        <motion.p 
          className="mb-6 dark:text-gray-300"
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.3 }}
        >
          The room you're looking for does not exist or may have been removed.
        </motion.p>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/rooms')}
          className="bg-custom-bg dark:bg-custom-bg-dark text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors btn-animate"
        >
          Back to Rooms
        </motion.button>
      </motion.div>
    );
  }

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <motion.button 
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/rooms')}
          className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
        >
          <FaChevronLeft className="mr-1" /> Back to Rooms
        </motion.button>
        
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-8 hover-lift transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Image gallery */}
          <div className="relative h-[60vh]">
            {room.images && room.images.length > 0 ? (
              <motion.img 
                key={currentImageIndex}
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                src={room.images[currentImageIndex]} 
                alt={`${room.type} view ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">No images available</p>
              </div>
            )}
            
            {room.images && room.images.length > 1 && (
              <>
                <motion.button 
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all dark:bg-gray-800 dark:bg-opacity-50 dark:hover:bg-opacity-75"
                  aria-label="Previous image"
                >
                  <FaChevronLeft className="text-gray-800 dark:text-white" />
                </motion.button>
                
                <motion.button 
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-all dark:bg-gray-800 dark:bg-opacity-50 dark:hover:bg-opacity-75"
                  aria-label="Next image"
                >
                  <FaChevronRight className="text-gray-800 dark:text-white" />
                </motion.button>
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {room.images.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50 hover:bg-opacity-75'}`}
                      aria-label={`View image ${index + 1}`}
                    ></button>
                  ))}
                </div>
              </>
            )}
          </div>
          
          <div className="p-6">
            <div className="flex flex-col md:flex-row justify-between items-start mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">{room.type}</h1>
                
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, rotateY: 90 }}
                      animate={{ opacity: 1, rotateY: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <FaStar 
                        className={index < (room.rating || 4) ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'} 
                      />
                    </motion.span>
                  ))}
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="ml-2 text-gray-600 dark:text-gray-400"
                  >
                    ({room.reviews?.length || 0} reviews)
                  </motion.span>
                </div>
                
                <motion.p 
                  className="text-2xl text-gray-800 dark:text-gray-200 font-semibold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  ₹{room.price} <span className="text-base font-normal">per night</span>
                </motion.p>
              </motion.div>
              
              <motion.div 
                className="mt-4 md:mt-0"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="flex space-x-2">
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm px-3 py-1 rounded-full">
                    {room.capacity} Adults
                  </span>
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm px-3 py-1 rounded-full">
                    {Math.floor(room.capacity / 2)} Children
                  </span>
                </div>
              </motion.div>
            </div>
            
            <motion.p 
              className="text-gray-700 dark:text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              {room.description}
            </motion.p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Features</h3>
                <ul className="space-y-2">
                  {room.features?.map((feature, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-center text-gray-700 dark:text-gray-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                    >
                      <span className="h-2 w-2 bg-custom-bg dark:bg-custom-bg-dark rounded-full mr-2"></span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-white">Facilities</h3>
                <ul className="space-y-2">
                  {room.facilities?.map((facility, index) => (
                    <motion.li 
                      key={index} 
                      className="flex items-center text-gray-700 dark:text-gray-300"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <span className="h-2 w-2 bg-custom-bg dark:bg-custom-bg-dark rounded-full mr-2"></span>
                      {facility}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </motion.div>
        
        {/* Booking Form */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8 hover-lift transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Book this room</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Check-in Date</label>
              <DatePicker
                selected={checkInDate}
                onChange={date => setCheckInDate(date)}
                selectsStart
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select date"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Check-out Date</label>
              <DatePicker
                selected={checkOutDate}
                onChange={date => setCheckOutDate(date)}
                selectsEnd
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={checkInDate || new Date()}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select date"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Adults</label>
              <select 
                value={adult}
                onChange={e => setAdult(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white"
              >
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Adult' : 'Adults'}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-gray-700 dark:text-gray-300 mb-2">Children</label>
              <select 
                value={children}
                onChange={e => setChildren(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-custom-bg dark:bg-gray-700 dark:text-white"
              >
                {[0, 1, 2, 3, 4].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'Child' : 'Children'}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex justify-between items-center flex-wrap">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600 dark:text-gray-400">Price: <span className="font-semibold text-gray-800 dark:text-gray-200">₹{room.price}</span> per night</p>
              {checkInDate && checkOutDate && (
                <motion.p 
                  className="text-gray-600 dark:text-gray-400"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  Total for{" "}
                  {Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))}{" "}
                  nights:{" "}
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    ₹{room.price * Math.round((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24))}
                  </span>
                </motion.p>
              )}
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBooking}
              className="bg-custom-bg dark:bg-custom-bg-dark text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors btn-animate"
            >
              Book Now
            </motion.button>
          </div>
        </motion.div>
        
        {/* Reviews Section */}
        <motion.div 
          className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover-lift transition-colors duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Guest Reviews</h2>
          
          {room.reviews && room.reviews.length > 0 ? (
            <div className="space-y-6">
              {room.reviews.map((review, idx) => (
                <motion.div 
                  key={review.id || idx} 
                  className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0 last:pb-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + idx * 0.1 }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">{review.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{review.date}</p>
                    </div>
                    <div className="flex">
                      {[...Array(5)].map((_, index) => (
                        <FaStar 
                          key={index} 
                          className={index < (review.rating || 4) ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No reviews yet. Be the first to leave a review!</p>
          )}
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
      </div>
    </PageTransition>
  );
};

export default RoomDetails; 