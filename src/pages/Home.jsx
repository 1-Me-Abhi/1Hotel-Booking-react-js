import React, { useState, useEffect } from 'react';
import Carousel from '../components/Carousel';
import CheckAvailability from '../components/CheckAvailability';
import RoomCard from '../components/RoomCard';
import { Link } from 'react-router-dom';
import { FaHotel, FaUtensils, FaSwimmingPool, FaWifi, FaSpa, FaDumbbell, FaStar } from 'react-icons/fa';

// Sample room data (in a real app, this would come from an API)
const sampleRooms = [
  {
    id: 1,
    name: 'Standard Room',
    price: 2499,
    features: ['King Bed', 'Balcony', 'Sea View'],
    facilities: ['AC', 'Room Service', 'TV'],
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    adult: 2,
    children: 1,
    rating: 4
  },
  {
    id: 2,
    name: 'Deluxe Suite',
    price: 3499,
    features: ['King Bed', 'Balcony', 'City View'],
    facilities: ['AC', 'Room Service', 'Mini Bar', 'TV'],
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    adult: 2,
    children: 2,
    rating: 5
  },
  {
    id: 3,
    name: 'Family Suite',
    price: 4999,
    features: ['2 Queen Beds', 'Balcony', 'Mountain View'],
    facilities: ['AC', 'Room Service', 'Mini Bar', 'TV', 'Jacuzzi'],
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    adult: 4,
    children: 2,
    rating: 5
  }
];

// Sample testimonials
const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    rating: 5,
    text: 'The hotel exceeded my expectations! The room was clean and comfortable, and the staff was incredibly helpful. I would definitely stay here again.',
    date: '2023-05-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    rating: 4,
    text: 'Great location and amenities. The breakfast buffet was amazing, and the spa services were top-notch. Highly recommended!',
    date: '2023-04-22'
  },
  {
    id: 3,
    name: 'Robert Johnson',
    rating: 5,
    text: 'We had a wonderful family vacation at this hotel. The kids loved the swimming pool, and we enjoyed the proximity to local attractions.',
    date: '2023-03-10'
  }
];

const Home = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Carousel */}
      <Carousel />
      
      {/* Check Availability Form */}
      <CheckAvailability />
      
      {/* Our Rooms */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 h-font dark:text-gray-100">OUR ROOMS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleRooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
        
        <div className="text-center mt-6">
          <Link 
            to="/rooms" 
            className="inline-block bg-custom-bg text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            More Rooms
          </Link>
        </div>
      </div>
      
      {/* Facilities */}
      <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-800 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center mb-8 h-font dark:text-gray-100">OUR FACILITIES</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="text-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-2">
              <FaHotel className="text-5xl text-custom-bg" />
            </div>
            <h5 className="font-medium dark:text-gray-200">Rooms</h5>
          </div>
          
          <div className="text-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-2">
              <FaUtensils className="text-5xl text-custom-bg" />
            </div>
            <h5 className="font-medium dark:text-gray-200">Restaurant</h5>
          </div>
          
          <div className="text-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-2">
              <FaSwimmingPool className="text-5xl text-custom-bg" />
            </div>
            <h5 className="font-medium dark:text-gray-200">Swimming Pool</h5>
          </div>
          
          <div className="text-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-2">
              <FaWifi className="text-5xl text-custom-bg" />
            </div>
            <h5 className="font-medium dark:text-gray-200">Free WiFi</h5>
          </div>
          
          <div className="text-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-2">
              <FaSpa className="text-5xl text-custom-bg" />
            </div>
            <h5 className="font-medium dark:text-gray-200">Spa</h5>
          </div>
          
          <div className="text-center p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
            <div className="flex justify-center mb-2">
              <FaDumbbell className="text-5xl text-custom-bg" />
            </div>
            <h5 className="font-medium dark:text-gray-200">Fitness Center</h5>
          </div>
        </div>
        
        <div className="text-center mt-6">
          <Link 
            to="/facilities" 
            className="inline-block bg-custom-bg text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
          >
            More Facilities
          </Link>
        </div>
      </div>
      
      {/* Testimonials */}
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 h-font dark:text-gray-100">TESTIMONIALS</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow dark:shadow-gray-900 transition-colors duration-300">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-500" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4">"{testimonial.text}"</p>
              <div className="flex justify-between items-center">
                <span className="font-medium dark:text-gray-200">{testimonial.name}</span>
                <span className="text-sm text-gray-500 dark:text-gray-400">{testimonial.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* About Us */}
      <div className="container mx-auto px-4 py-8 bg-white dark:bg-gray-800 transition-colors duration-300">
        <h2 className="text-3xl font-bold text-center mb-8 h-font dark:text-gray-100">ABOUT US</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
              alt="Hotel"
              className="rounded-lg shadow-md w-full h-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-2xl font-semibold mb-4 h-font">Welcome to Hotel Booking</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Hotel Booking offers a luxurious and comfortable stay with world-class amenities. Our commitment to excellence ensures that every guest experiences the best hospitality services.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Located in prime locations, our hotels provide easy access to popular attractions, shopping centers, and business districts. Whether you're traveling for business or pleasure, we have the perfect accommodations for you.
            </p>
            <Link 
              to="/about" 
              className="inline-block bg-custom-bg text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll to top button */}
      {showButton && (
        <button 
          onClick={scrollToTop} 
          className="fixed bottom-4 right-4 bg-custom-bg text-white p-3 rounded-full shadow-md hover:bg-opacity-90 transition-colors"
          aria-label="Scroll to top"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Home; 