import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaMobileAlt, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 py-8 mt-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h5 className="text-xl font-bold mb-4 h-font dark:text-gray-100">Hotel Booking</h5>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Welcome to Hotel Booking, where comfort meets luxury. Experience the best hospitality services during your stay with us.
            </p>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4 dark:text-gray-100">Links</h5>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-700 dark:text-gray-300 hover:text-custom-bg dark:hover:text-custom-bg transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/rooms" className="text-gray-700 dark:text-gray-300 hover:text-custom-bg dark:hover:text-custom-bg transition-colors">Rooms</Link>
              </li>
              <li>
                <Link to="/facilities" className="text-gray-700 dark:text-gray-300 hover:text-custom-bg dark:hover:text-custom-bg transition-colors">Facilities</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-700 dark:text-gray-300 hover:text-custom-bg dark:hover:text-custom-bg transition-colors">Contact us</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-700 dark:text-gray-300 hover:text-custom-bg dark:hover:text-custom-bg transition-colors">About</Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4 dark:text-gray-100">Contact Us</h5>
            <div className="space-y-3">
              <div className="flex items-start">
                <FaMapMarkerAlt className="mt-1 mr-2 text-custom-bg" />
                <span className="text-gray-700 dark:text-gray-300">123 Hotel Street, XYZ City, 12345</span>
              </div>
              <div className="flex items-center">
                <FaPhoneAlt className="mr-2 text-custom-bg" />
                <span className="text-gray-700 dark:text-gray-300">+1 234 567 8900</span>
              </div>
              <div className="flex items-center">
                <FaMobileAlt className="mr-2 text-custom-bg" />
                <span className="text-gray-700 dark:text-gray-300">+1 234 567 8901</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2 text-custom-bg" />
                <span className="text-gray-700 dark:text-gray-300">info@hotelbooking.com</span>
              </div>
            </div>
          </div>

          <div>
            <h5 className="text-lg font-semibold mb-4 dark:text-gray-100">Follow Us</h5>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
                <FaFacebook />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-blue-400 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-200">
                <FaTwitter />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-2xl text-pink-600 hover:text-pink-800 dark:text-pink-400 dark:hover:text-pink-300">
                <FaInstagram />
              </a>
            </div>
            
            <h5 className="text-lg font-semibold my-4 dark:text-gray-100">Subscribe</h5>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="p-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-l focus:outline-none focus:ring-2 focus:ring-custom-bg"
              />
              <button 
                type="submit" 
                className="bg-custom-bg text-white px-4 py-2 rounded-r hover:bg-opacity-90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-4 text-center">
          <p className="text-gray-700 dark:text-gray-300">
            &copy; {new Date().getFullYear()} Hotel Booking. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 