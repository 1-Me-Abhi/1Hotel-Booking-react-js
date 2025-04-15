import React from 'react';
import { FaStar, FaUsers, FaHotel, FaAward } from 'react-icons/fa';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 h-font">ABOUT US</h2>
      
      {/* Hotel Introduction */}
      <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
        <div className="md:w-1/2">
          <img 
            src="https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
            alt="Hotel Booking"
            className="rounded-lg shadow-md w-full h-auto"
          />
        </div>
        <div className="md:w-1/2">
          <h3 className="text-2xl font-semibold mb-4 h-font">Welcome to Hotel Booking</h3>
          <p className="text-gray-700 mb-4">
            Founded in 2010, Hotel Booking has established itself as a premier destination for travelers seeking comfort, luxury, and exceptional service. Our commitment to excellence has made us a preferred choice for both business and leisure travelers.
          </p>
          <p className="text-gray-700 mb-4">
            Located in prime locations, our hotels provide easy access to popular attractions, shopping centers, and business districts. Each of our properties is designed with a perfect blend of elegance and comfort to ensure a memorable stay for our guests.
          </p>
          <p className="text-gray-700">
            With a focus on personalized service, we strive to exceed our guests' expectations and create an environment where they can relax and rejuvenate during their stay with us.
          </p>
        </div>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaHotel className="text-4xl text-custom-bg mx-auto mb-4" />
          <h4 className="text-3xl font-bold mb-2">50+</h4>
          <p className="text-gray-700">Rooms Available</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaUsers className="text-4xl text-custom-bg mx-auto mb-4" />
          <h4 className="text-3xl font-bold mb-2">10,000+</h4>
          <p className="text-gray-700">Happy Guests</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaStar className="text-4xl text-custom-bg mx-auto mb-4" />
          <h4 className="text-3xl font-bold mb-2">4.8</h4>
          <p className="text-gray-700">Average Rating</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <FaAward className="text-4xl text-custom-bg mx-auto mb-4" />
          <h4 className="text-3xl font-bold mb-2">15+</h4>
          <p className="text-gray-700">Industry Awards</p>
        </div>
      </div>
      
      {/* Our Mission */}
      <div className="bg-white p-8 rounded-lg shadow-md mb-12">
        <h3 className="text-2xl font-semibold mb-4 text-center h-font">Our Mission</h3>
        <p className="text-gray-700 text-center max-w-3xl mx-auto">
          Our mission is to provide exceptional hospitality experiences that exceed our guests' expectations through personalized service, luxurious accommodations, and a commitment to excellence in every aspect of our operations.
        </p>
      </div>
      
      {/* Our Team */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold mb-6 text-center h-font">Our Team</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=461&q=80" 
              alt="Sarah Johnson"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold mb-1">Sarah Johnson</h4>
              <p className="text-custom-bg mb-2">General Manager</p>
              <p className="text-gray-700">With over 15 years of experience in the hospitality industry, Sarah leads our team with a focus on excellence and guest satisfaction.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80" 
              alt="Michael Chen"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold mb-1">Michael Chen</h4>
              <p className="text-custom-bg mb-2">Head Chef</p>
              <p className="text-gray-700">Michael brings his culinary expertise from around the world to create delightful dining experiences for our guests.</p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1587614382346-4ec70e388b28?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
              alt="Emily Rodriguez"
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-semibold mb-1">Emily Rodriguez</h4>
              <p className="text-custom-bg mb-2">Customer Relations Manager</p>
              <p className="text-gray-700">Emily ensures that every guest receives personalized attention and that their stay exceeds their expectations.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials */}
      <div>
        <h3 className="text-2xl font-semibold mb-6 text-center h-font">What Our Guests Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="text-yellow-500" />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-4 italic">
              "The service was exceptional, and the rooms were immaculate. The staff went above and beyond to make our stay comfortable. We will definitely be returning!"
            </p>
            <div className="flex justify-between items-center">
              <span className="font-medium">John & Lisa Smith</span>
              <span className="text-sm text-gray-500">New York, USA</span>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <FaStar key={index} className="text-yellow-500" />
                ))}
              </div>
            </div>
            <p className="text-gray-700 mb-4 italic">
              "From the moment we arrived, we were treated like royalty. The hotel's amenities are top-notch, and the location is perfect for exploring the city. Highly recommended!"
            </p>
            <div className="flex justify-between items-center">
              <span className="font-medium">David Williams</span>
              <span className="text-sm text-gray-500">London, UK</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 