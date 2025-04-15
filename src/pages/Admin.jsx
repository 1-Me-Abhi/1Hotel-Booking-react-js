import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllUsers } from '../firebase/userService';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { currentUser } = useAuth();

  // Page animation
  const pageAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: 'easeInOut' }
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  // Load data based on active tab
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === 'users' || activeTab === 'dashboard') {
          const userData = await getAllUsers();
          setUsers(userData);
        }
        
        if (activeTab === 'bookings' || activeTab === 'dashboard') {
          const bookingsRef = collection(db, 'bookings');
          const bookingsSnapshot = await getDocs(bookingsRef);
          const bookingsList = bookingsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setBookings(bookingsList);
        }
        
        if (activeTab === 'rooms' || activeTab === 'dashboard') {
          const roomsRef = collection(db, 'rooms');
          const roomsSnapshot = await getDocs(roomsRef);
          const roomsList = roomsSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setRooms(roomsList);
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [activeTab]);

  // Render tabs
  const renderTabs = () => (
    <div className="border-b border-gray-200 dark:border-gray-700 mb-5">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center">
        <TabItem id="dashboard" active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>
          Dashboard
        </TabItem>
        <TabItem id="users" active={activeTab === 'users'} onClick={() => setActiveTab('users')}>
          Users
        </TabItem>
        <TabItem id="bookings" active={activeTab === 'bookings'} onClick={() => setActiveTab('bookings')}>
          Bookings
        </TabItem>
        <TabItem id="rooms" active={activeTab === 'rooms'} onClick={() => setActiveTab('rooms')}>
          Rooms
        </TabItem>
      </ul>
    </div>
  );

  // Tab item component
  const TabItem = ({ id, active, onClick, children }) => (
    <li className="mr-2">
      <button 
        onClick={onClick}
        className={`inline-block p-4 rounded-t-lg ${
          active 
            ? 'text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500' 
            : 'border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
        }`}
      >
        {children}
      </button>
    </li>
  );

  // Dashboard overview
  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <StatCard title="Total Users" value={users.length} color="blue" />
      <StatCard title="Total Bookings" value={bookings.length} color="green" />
      <StatCard title="Available Rooms" value={rooms.length} color="purple" />
    </div>
  );

  // Stat card component
  const StatCard = ({ title, value, color }) => {
    const colorClasses = {
      blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
      green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
    };
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <div className={`text-4xl font-bold ${colorClasses[color]} px-2.5 py-0.5 rounded-full inline-block`}>
          {value}
        </div>
      </div>
    );
  };

  // Users table
  const renderUsers = () => (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Admin Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.phonenum || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  user.isAdmin ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                }`}>
                  {user.isAdmin ? 'Admin' : 'User'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Bookings table
  const renderBookings = () => (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Booking ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Room</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Check-in</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Check-out</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {bookings.map((booking) => (
            <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap">{booking.id.substring(0, 8)}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.userName || booking.userId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.roomName || booking.roomId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.checkIn ? new Date(booking.checkIn.toDate()).toLocaleDateString() : 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">{booking.checkOut ? new Date(booking.checkOut.toDate()).toLocaleDateString() : 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  booking.status === 'confirmed' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                    : booking.status === 'pending' 
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {booking.status || 'N/A'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Rooms table
  const renderRooms = () => (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Room #</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
          {rooms.map((room) => (
            <tr key={room.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap">{room.roomNumber || room.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{room.type || 'Standard'}</td>
              <td className="px-6 py-4 whitespace-nowrap">${room.price || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  room.available ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {room.available ? 'Available' : 'Booked'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Render content based on active tab
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    
    if (error) {
      return (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      );
    }
    
    switch (activeTab) {
      case 'dashboard':
        return (
          <>
            {renderDashboard()}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold mb-4">Recent Bookings</h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">User</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                      {bookings.slice(0, 5).map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="px-4 py-2 whitespace-nowrap">{booking.id.substring(0, 8)}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{booking.userName || booking.userId}</td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === 'confirmed' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                : booking.status === 'pending' 
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {booking.status || 'N/A'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h2 className="text-xl font-semibold mb-4">User Overview</h2>
                <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-900 dark:divide-gray-700">
                      {users.slice(0, 5).map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="px-4 py-2 whitespace-nowrap">{user.name}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.isAdmin ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            }`}>
                              {user.isAdmin ? 'Admin' : 'User'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        );
      case 'users':
        return renderUsers();
      case 'bookings':
        return renderBookings();
      case 'rooms':
        return renderRooms();
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className="container mx-auto px-4 py-8"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageAnimation}
    >
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Logged in as: <span className="font-semibold">{currentUser?.displayName || currentUser?.email}</span>
        </div>
      </div>
      
      {renderTabs()}
      {renderContent()}
    </motion.div>
  );
};

export default Admin; 