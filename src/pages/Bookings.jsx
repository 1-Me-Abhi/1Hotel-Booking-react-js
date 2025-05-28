import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaBed, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaDownload, FaTimesCircle, FaFilter } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import bookingService from '../services/bookingService';

const Bookings = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn) {
      navigate('/');
      return;
    }
    
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/bookings/my-bookings`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch bookings');
        }

        const data = await response.json();
        // Sort bookings by creation date (newest first)
        const sortedBookings = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setBookings(sortedBookings);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchBookings();
  }, [isLoggedIn, navigate]);
  
  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        // Check if user is logged in
        if (!isLoggedIn) {
          setError('Please log in to cancel your booking');
          return;
        }

        // Check if token exists
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token missing. Please log in again.');
          return;
        }

        const response = await bookingService.cancelBooking(bookingId);
        
        if (response.message === 'Booking cancelled successfully') {
          setBookings(prevBookings => 
            prevBookings.map(booking => 
              booking._id === bookingId 
                ? { ...booking, status: 'cancelled', paymentStatus: 'refunded' } 
                : booking
            )
          );
          // Clear any existing errors
          setError(null);
        } else {
          setError('Failed to cancel booking. Please try again later.');
        }
      } catch (err) {
        console.error('Cancellation error:', err);
        setError(err.response?.data?.message || 'Failed to cancel booking. Please try again later.');
      }
    }
  };
  
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };
  
  const filteredBookings = () => {
    if (filter === 'all') return bookings;
    return bookings.filter(booking => 
      booking.status.toLowerCase() === filter.toLowerCase()
    );
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getPaymentBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'refunded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Loading your bookings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      
      {bookings.length > 0 ? (
        <>
          <div className="mb-6 flex items-center justify-between flex-wrap">
            <h2 className="text-xl font-semibold mb-2 md:mb-0">Booking History</h2>
            
            <div className="flex space-x-2">
              <button
                onClick={() => handleFilterChange('all')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'all' ? 'bg-custom-bg text-white' : 'bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleFilterChange('confirmed')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'confirmed' ? 'bg-custom-bg text-white' : 'bg-gray-200'
                }`}
              >
                Confirmed
              </button>
              <button
                onClick={() => handleFilterChange('cancelled')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'cancelled' ? 'bg-custom-bg text-white' : 'bg-gray-200'
                }`}
              >
                Cancelled
              </button>
              <button
                onClick={() => handleFilterChange('completed')}
                className={`px-4 py-2 rounded-md ${
                  filter === 'completed' ? 'bg-custom-bg text-white' : 'bg-gray-200'
                }`}
              >
                Completed
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {filteredBookings().map((booking) => (
              <div key={booking._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{booking.room?.type || 'Room Type Not Available'}</h3>
                      <div className="flex items-center text-gray-600 mb-2">
                        <FaBed className="mr-2" />
                        Room {booking.room?.roomNumber || 'N/A'}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeClass(booking.status)}`}>
                        {booking.status}
                      </span>
                      <div className="mt-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${getPaymentBadgeClass(booking.paymentStatus)}`}>
                          {booking.paymentStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <FaCalendarAlt className="mr-2" />
                      <div>
                        <p className="text-sm">Check-in: {formatDate(booking.checkIn)}</p>
                        <p className="text-sm">Check-out: {formatDate(booking.checkOut)}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaMoneyBillWave className="mr-2" />
                      <div>
                        <p className="text-sm">Total Price: ${booking.totalPrice || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {booking.specialRequests && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-600">Special Requests:</p>
                      <p className="text-gray-800">{booking.specialRequests}</p>
                    </div>
                  )}

                  <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                    <div className="text-sm text-gray-600">
                      Booked on: {formatDate(booking.createdAt)}
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="flex items-center text-blue-600 hover:text-blue-800">
                        <FaDownload className="mr-1" /> Invoice
                      </button>
                      
                      {booking.room?._id && (
                      <Link 
                        to={`/room/${booking.room._id}`}
                        className="flex items-center text-custom-bg hover:text-opacity-80"
                      >
                        View Room
                      </Link>
                      )}
                      
                      {booking.status.toLowerCase() === 'confirmed' && (
                        <button 
                          className="flex items-center text-red-600 hover:text-red-800"
                          onClick={() => handleCancelBooking(booking._id)}
                        >
                          <FaTimesCircle className="mr-1" /> Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">No Bookings Found</h2>
          <p className="mb-6">You haven't made any bookings yet. Start by exploring our rooms.</p>
          <Link
            to="/rooms"
            className="bg-custom-bg text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            Browse Rooms
          </Link>
        </div>
      )}
    </div>
  );
};

export default Bookings; 