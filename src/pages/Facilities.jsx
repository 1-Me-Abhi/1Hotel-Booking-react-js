import React from 'react';
import { FaHotel, FaUtensils, FaSwimmingPool, FaWifi, FaSpa, FaDumbbell, FaParking, FaShuttleVan, FaCoffee, FaGlassMartiniAlt, FaConciergeBell, FaClock, FaUserTie, FaTshirt, FaMoneyBillWave, FaTicketAlt, FaBaby } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Facilities = () => {
  const facilities = [
    {
      id: 1,
      name: 'Luxury Rooms',
      description: 'Our spacious and beautifully designed rooms offer the perfect blend of comfort and elegance. Each room is equipped with modern amenities to ensure a pleasant stay.',
      icon: <FaHotel className="text-5xl text-custom-bg" />
    },
    {
      id: 2,
      name: 'Restaurant',
      description: 'Indulge in culinary delights at our in-house restaurant, offering a diverse menu of local and international cuisines prepared by our expert chefs.',
      icon: <FaUtensils className="text-5xl text-custom-bg" />
    },
    {
      id: 3,
      name: 'Swimming Pool',
      description: 'Take a refreshing dip in our swimming pool or relax by the poolside with a refreshing drink while enjoying the serene atmosphere.',
      icon: <FaSwimmingPool className="text-5xl text-custom-bg" />
    },
    {
      id: 4,
      name: 'Free WiFi',
      description: 'Stay connected with our complimentary high-speed WiFi available throughout the hotel. Perfect for both business and leisure travelers.',
      icon: <FaWifi className="text-5xl text-custom-bg" />
    },
    {
      id: 5,
      name: 'Spa',
      description: 'Rejuvenate your mind and body at our spa, offering a range of therapeutic treatments and massages to enhance your wellbeing during your stay.',
      icon: <FaSpa className="text-5xl text-custom-bg" />
    },
    {
      id: 6,
      name: 'Fitness Center',
      description: 'Maintain your fitness routine at our well-equipped fitness center, featuring modern exercise equipment for a complete workout experience.',
      icon: <FaDumbbell className="text-5xl text-custom-bg" />
    },
    {
      id: 7,
      name: 'Parking',
      description: 'Convenient parking facilities are available for guests traveling with their own vehicles. Valet parking services are also provided.',
      icon: <FaParking className="text-5xl text-custom-bg" />
    },
    {
      id: 8,
      name: 'Airport Shuttle',
      description: 'Enjoy hassle-free transportation with our airport shuttle service. Pre-booking is required to ensure availability.',
      icon: <FaShuttleVan className="text-5xl text-custom-bg" />
    },
    {
      id: 9,
      name: 'Café',
      description: 'Our cozy café offers a selection of coffee, tea, and light snacks. The perfect spot to relax or catch up on work.',
      icon: <FaCoffee className="text-5xl text-custom-bg" />
    },
    {
      id: 10,
      name: 'Bar & Lounge',
      description: 'Unwind with your favorite drink at our bar and lounge, offering a wide selection of cocktails, wines, and spirits in a sophisticated setting.',
      icon: <FaGlassMartiniAlt className="text-5xl text-custom-bg" />
    },
    {
      id: 11,
      name: 'Room Service',
      description: '24-hour room service is available for guests who prefer dining in the comfort of their rooms. Our extensive menu caters to all taste preferences.',
      icon: <FaConciergeBell className="text-5xl text-custom-bg" />
    }
  ];

  const additionalServices = [
    {
      id: 1,
      name: '24-hour front desk',
      icon: <FaClock className="text-xl text-custom-bg" />
    },
    {
      id: 2,
      name: 'Concierge services',
      icon: <FaUserTie className="text-xl text-custom-bg" />
    },
    {
      id: 3,
      name: 'Laundry and dry cleaning',
      icon: <FaTshirt className="text-xl text-custom-bg" />
    },
    {
      id: 4,
      name: 'Currency exchange',
      icon: <FaMoneyBillWave className="text-xl text-custom-bg" />
    },
    {
      id: 5,
      name: 'Tour desk and ticket assistance',
      icon: <FaTicketAlt className="text-xl text-custom-bg" />
    },
    {
      id: 6,
      name: 'Babysitting/childcare services (on request)',
      icon: <FaBaby className="text-xl text-custom-bg" />
    }
  ];

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

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    hover: { 
      y: -10,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: { duration: 0.3 }
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 10 }
    },
    hover: {
      scale: 1.1,
      rotate: [0, 5, -5, 0],
      transition: { duration: 0.5, repeat: Infinity, repeatType: "mirror" }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-12"
    >
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-12 h-font dark:text-white"
      >
        OUR FACILITIES
      </motion.h2>
      
      <motion.div 
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {facilities.map((facility, index) => (
          <motion.div 
            key={facility.id}
            variants={cardVariants}
            whileHover="hover"
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg dark:shadow-gray-900/30 overflow-hidden border border-gray-100 dark:border-gray-700 transition-all duration-300"
          >
            <div className="p-8">
              <motion.div 
                className="flex justify-center mb-6"
                variants={iconVariants}
                whileHover="hover"
              >
                {facility.icon}
              </motion.div>
              <h3 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-white">{facility.name}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">{facility.description}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-16 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-lg dark:shadow-gray-900/30 p-8 border border-gray-100 dark:border-gray-700"
      >
        <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Additional Services</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {additionalServices.map((service) => (
            <motion.div 
              key={service.id}
              whileHover={{ x: 5 }}
              className="flex items-center p-3 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
            >
              <div className="mr-3">
                {service.icon}
              </div>
              <span className="text-gray-800 dark:text-gray-200">{service.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Facilities; 