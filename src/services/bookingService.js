import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const bookingService = {
  // Get all bookings for the current user
  getMyBookings: async () => {
    const response = await axios.get(`${API_URL}/bookings/my-bookings`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  },

  // Create a new booking
  createBooking: async (bookingData) => {
    try {
      const response = await axios.post(`${API_URL}/bookings`, bookingData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw error;
      } else if (error.request) {
        // The request was made but no response was received
        throw new Error('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error('Error setting up the request. Please try again.');
      }
    }
  },

  // Cancel a booking
  cancelBooking: async (bookingId) => {
    const response = await axios.delete(`${API_URL}/bookings/${bookingId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  }
};

export default bookingService; 