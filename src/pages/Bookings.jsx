import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaBed, FaCalendarAlt, FaUsers, FaMoneyBillWave, FaDownload, FaTimesCircle, FaFilter } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

// Sample bookings data (in a real app, this would come from an API)
const sampleBookings = [
  {
    id: 1,
    roomName: 'Deluxe Suite',
    checkIn: '2023-08-15',
    checkOut: '2023-08-18',
    adult: 2,
    children: 1,
    amount: 10497,
    bookingDate: '2023-07-28',
    status: 'Confirmed', // Confirmed, Cancelled, Completed
    paymentStatus: 'Paid', // Paid, Pending
    roomId: 2
  },
  {
    id: 2,
    roomName: 'Standard Room',
    checkIn: '2023-09-05',
    checkOut: '2023-09-07',
    adult: 1,
    children: 0,
    amount: 4998,
    bookingDate: '2023-08-10',
    status: 'Cancelled',
    paymentStatus: 'Refunded',
    roomId: 1
  },
  {
    id: 3,
    roomName: 'Family Suite',
    checkIn: '2023-11-20',
    checkOut: '2023-11-25',
    adult: 4,
    children: 2,
    amount: 24995,
    bookingDate: '2023-08-15',
    status: 'Confirmed',
    paymentStatus: 'Paid',
    roomId: 3
  },
  {
    id: 4,
    roomName: 'Standard Room',
    checkIn: new Date().toISOString().split('T')[0], // Today's date
    checkOut: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // Today + 2 days
    adult: 2,
    children: 0,
    amount: 4998,
    bookingDate: new Date().toISOString().split('T')[0], // Today's date
    status: 'Confirmed',
    paymentStatus: 'Paid',
    roomId: 1
  }
];

const Bookings = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  
  useEffect(() => {
    // Check if user is logged in
    if (!isLoggedIn) {
      navigate('/');
      return;
    }
    
    // Simulate API call to fetch bookings
    setTimeout(() => {
      setBookings(sampleBookings);
      setLoading(false);
    }, 1000);
  }, [isLoggedIn, navigate]);
  
  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      // In a real app, this would send a cancel request to the API
      setBookings(prevBookings => 
        prevBookings.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: 'Cancelled', paymentStatus: 'Refunded' } 
            : booking
        )
      );
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
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      
      {bookings.length > 0 ? (
        <>
          <div className="mb-6 flex items-center justify-between flex-wrap">
            <h2 className="text-xl font-semibold mb-2 md:mb-0">Booking History</h2>
            
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 rounded-md ${filter === 'all' ? 'bg-custom-bg text-white' : 'bg-gray-100 text-gray-800'}`}
                onClick={() => handleFilterChange('all')}
              >
                All
              </button>
              <button 
                className={`px-3 py-1 rounded-md ${filter === 'confirmed' ? 'bg-custom-bg text-white' : 'bg-gray-100 text-gray-800'}`}
                onClick={() => handleFilterChange('confirmed')}
              >
                Confirmed
              </button>
              <button 
                className={`px-3 py-1 rounded-md ${filter === 'cancelled' ? 'bg-custom-bg text-white' : 'bg-gray-100 text-gray-800'}`}
                onClick={() => handleFilterChange('cancelled')}
              >
                Cancelled
              </button>
              <button 
                className={`px-3 py-1 rounded-md ${filter === 'completed' ? 'bg-custom-bg text-white' : 'bg-gray-100 text-gray-800'}`}
                onClick={() => handleFilterChange('completed')}
              >
                Completed
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            {filteredBookings().map(booking => (
              <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">{booking.roomName}</h3>
                      <p className="text-gray-600 text-sm">Booking ID: {booking.id}</p>
                    </div>
                    
                    <div className="flex space-x-2 mt-2 md:mt-0">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeClass(booking.status)}`}>
                        Status: {booking.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${getPaymentBadgeClass(booking.paymentStatus)}`}>
                        Payment: {booking.paymentStatus}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Check-in</p>
                      <p className="font-medium">{formatDate(booking.checkIn)}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Check-out</p>
                      <p className="font-medium">{formatDate(booking.checkOut)}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Guests</p>
                      <p className="font-medium">{booking.adult} Adult{booking.adult !== 1 ? 's' : ''}, {booking.children} Child{booking.children !== 1 ? 'ren' : ''}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-600">Amount</p>
                      <p className="font-semibold">₹{booking.amount}</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-gray-200 pt-4">
                    <div className="text-sm text-gray-600">
                      Booked on: {formatDate(booking.bookingDate)}
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="flex items-center text-blue-600 hover:text-blue-800">
                        <FaDownload className="mr-1" /> Invoice
                      </button>
                      
                      <Link 
                        to={`/room/${booking.roomId}`}
                        className="flex items-center text-custom-bg hover:text-opacity-80"
                      >
                        View Room
                      </Link>
                      
                      {booking.status.toLowerCase() === 'confirmed' && (
                        <button 
                          className="flex items-center text-red-600 hover:text-red-800"
                          onClick={() => handleCancelBooking(booking.id)}
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