import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaMobileAlt, FaPaperPlane, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // In a real app, this would send the data to an API
    setTimeout(() => {
      console.log(formData);
      setSubmitted(true);
      setLoading(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset submission status after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 3000);
    }, 1000); // Simulate API call delay
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
      transition: { duration: 0.5 }
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
        variants={itemVariants}
        className="text-4xl font-bold text-center mb-12 h-font dark:text-white"
      >
        CONTACT US
      </motion.h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <motion.div 
          variants={itemVariants}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Get in Touch</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-8">
            We'd love to hear from you! Whether you have a question about our rooms, facilities, or anything else, our team is ready to answer all your questions.
          </p>
          
          <div className="space-y-6">
            <motion.div 
              className="flex items-start"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 rounded-full bg-custom-bg/10 dark:bg-custom-bg/20 flex items-center justify-center mr-4">
                <FaMapMarkerAlt className="text-custom-bg" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">Address</h4>
                <p className="text-gray-700 dark:text-gray-300">123 Hotel Street, XYZ City, 12345</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 rounded-full bg-custom-bg/10 dark:bg-custom-bg/20 flex items-center justify-center mr-4">
                <FaPhoneAlt className="text-custom-bg" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">Phone</h4>
                <p className="text-gray-700 dark:text-gray-300">+1 234 567 8900</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 rounded-full bg-custom-bg/10 dark:bg-custom-bg/20 flex items-center justify-center mr-4">
                <FaMobileAlt className="text-custom-bg" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">Mobile</h4>
                <p className="text-gray-700 dark:text-gray-300">+1 234 567 8901</p>
              </div>
            </motion.div>
            
            <motion.div 
              className="flex items-start"
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 rounded-full bg-custom-bg/10 dark:bg-custom-bg/20 flex items-center justify-center mr-4">
                <FaEnvelope className="text-custom-bg" />
              </div>
              <div>
                <h4 className="font-medium text-gray-800 dark:text-white">Email</h4>
                <p className="text-gray-700 dark:text-gray-300">info@hotelbooking.com</p>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-10">
            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Opening Hours</h3>
            <div className="rounded-xl overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 flex items-center border-b border-gray-200 dark:border-gray-600">
                <FaClock className="text-custom-bg mr-3" />
                <span className="font-medium text-gray-800 dark:text-white">Check-in Time</span>
                <span className="ml-auto text-gray-700 dark:text-gray-300">12:00 PM</span>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 flex items-center border-b border-gray-200 dark:border-gray-600">
                <FaClock className="text-custom-bg mr-3" />
                <span className="font-medium text-gray-800 dark:text-white">Check-out Time</span>
                <span className="ml-auto text-gray-700 dark:text-gray-300">11:00 AM</span>
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 p-4 flex items-center">
                <FaClock className="text-custom-bg mr-3" />
                <span className="font-medium text-gray-800 dark:text-white">Reception</span>
                <span className="ml-auto text-gray-700 dark:text-gray-300">24/7</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          variants={itemVariants}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg dark:shadow-gray-900/30 border border-gray-100 dark:border-gray-700"
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Send us a Message</h3>
          
          {submitted && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 p-4 rounded-xl mb-6"
            >
              <div className="flex items-center">
                <div className="mr-3 bg-green-200 dark:bg-green-800 rounded-full p-1">
                  <svg className="w-5 h-5 text-green-700 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <span>Thank you for your message! We'll get back to you shortly.</span>
              </div>
            </motion.div>
          )}
          
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 p-4 rounded-xl mb-6"
            >
              <div className="flex items-center">
                <div className="mr-3 bg-red-200 dark:bg-red-800 rounded-full p-1">
                  <svg className="w-5 h-5 text-red-700 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </div>
                <span>{error}</span>
              </div>
            </motion.div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-gray-700 dark:text-gray-300 mb-2">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-gray-700 dark:text-gray-300 mb-2">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-custom-bg dark:text-white"
                required
              ></textarea>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="bg-custom-bg hover:bg-custom-bg-dark text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <FaPaperPlane className="mr-2" />
              )}
              <span>{loading ? 'Sending...' : 'Send Message'}</span>
            </motion.button>
          </form>
        </motion.div>
      </div>
      
      {/* Google Map */}
      <motion.div 
        variants={itemVariants}
        className="bg-gray-100 dark:bg-gray-700 rounded-2xl h-96 flex items-center justify-center shadow-md dark:shadow-gray-900/30 overflow-hidden"
      >
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.305935303!2d-74.25986548248684!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1659123475185!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Hotel Location"
          className="filter grayscale"
        ></iframe>
      </motion.div>
    </motion.div>
  );
};

export default Contact; 