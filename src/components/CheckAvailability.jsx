import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { FaCalendarAlt, FaUsers, FaChild, FaSearch } from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'react-datepicker/dist/react-datepicker.css';

const CheckAvailability = () => {
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!checkInDate || !checkOutDate) {
      alert('Please select check-in and check-out dates');
      return;
    }
    
    // Format dates to YYYY-MM-DD
    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };
    
    const queryParams = new URLSearchParams({
      checkin: formatDate(checkInDate),
      checkout: formatDate(checkOutDate),
      adult,
      children,
      check_availability: 1
    }).toString();
    
    navigate(`/rooms?${queryParams}`);
  };

  const containerVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: i => ({ 
      y: 0, 
      opacity: 1,
      transition: { 
        delay: i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <div className="container mx-auto -mt-14 relative z-10 px-4 mb-12">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl dark:shadow-gray-900/30 p-6 border border-gray-100 dark:border-gray-700"
      >
        <h5 className="text-xl font-bold mb-6 text-gray-800 dark:text-white text-center">Find Your Perfect Room</h5>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <motion.div 
              className="md:col-span-3"
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 flex items-center">
                <FaCalendarAlt className="mr-2 text-custom-bg" />
                Check-in
              </label>
              <div className="relative">
                <DatePicker
                  selected={checkInDate}
                  onChange={(date) => setCheckInDate(date)}
                  selectsStart
                  startDate={checkInDate}
                  endDate={checkOutDate}
                  minDate={new Date()}
                  dateFormat="yyyy-MM-dd"
                  className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white text-sm"
                  placeholderText="Select date"
                  required
                />
              </div>
            </motion.div>
            
            <motion.div 
              className="md:col-span-3"
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 flex items-center">
                <FaCalendarAlt className="mr-2 text-custom-bg" />
                Check-out
              </label>
              <DatePicker
                selected={checkOutDate}
                onChange={(date) => setCheckOutDate(date)}
                selectsEnd
                startDate={checkInDate}
                endDate={checkOutDate}
                minDate={checkInDate || new Date()}
                dateFormat="yyyy-MM-dd"
                className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white text-sm"
                placeholderText="Select date"
                required
              />
            </motion.div>
            
            <motion.div 
              className="md:col-span-2"
              custom={2}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 flex items-center">
                <FaUsers className="mr-2 text-custom-bg" />
                Adults
              </label>
              <select 
                value={adult}
                onChange={(e) => setAdult(parseInt(e.target.value))}
                className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white text-sm appearance-none cursor-pointer"
              >
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </motion.div>
            
            <motion.div 
              className="md:col-span-2"
              custom={3}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2 flex items-center">
                <FaChild className="mr-2 text-custom-bg" />
                Children
              </label>
              <select 
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value))}
                className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white text-sm appearance-none cursor-pointer"
              >
                {[0, 1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </motion.div>
            
            <motion.div 
              className="md:col-span-2"
              custom={4}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit" 
                className="w-full bg-custom-bg hover:bg-custom-bg-dark text-white py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
              >
                <FaSearch className="mr-2" />
                <span>Search Rooms</span>
              </motion.button>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CheckAvailability; 