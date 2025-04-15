import React from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleDarkMode}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 shadow-sm hover:shadow-md dark:shadow-gray-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-custom-bg focus:ring-opacity-50"
      aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
    >
      <motion.div
        initial={false}
        animate={{ 
          rotate: darkMode ? 180 : 0,
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 0.5,
          scale: { duration: 0.3 } 
        }}
      >
        {darkMode ? (
          <FaSun className="text-yellow-400 text-lg" />
        ) : (
          <FaMoon className="text-indigo-700 text-lg" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle; 