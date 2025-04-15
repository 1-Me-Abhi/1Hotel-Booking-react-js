import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import { FaSearch, FaFilter } from 'react-icons/fa';

// Sample room data (in a real app, this would come from an API)
const allRooms = [
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
  },
  {
    id: 4,
    name: 'Executive Room',
    price: 3999,
    features: ['King Bed', 'Work Desk', 'City View'],
    facilities: ['AC', 'Room Service', 'Mini Bar', 'TV', 'High-speed WiFi'],
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    adult: 2,
    children: 1,
    rating: 4
  },
  {
    id: 5,
    name: 'Honeymoon Suite',
    price: 5999,
    features: ['King Bed', 'Private Balcony', 'Ocean View'],
    facilities: ['AC', 'Room Service', 'Mini Bar', 'TV', 'Jacuzzi', 'Champagne Service'],
    image: 'https://images.unsplash.com/photo-1602002418082-dd878720e72d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    adult: 2,
    children: 0,
    rating: 5
  },
  {
    id: 6,
    name: 'Budget Room',
    price: 1499,
    features: ['Twin Beds', 'Basic Amenities'],
    facilities: ['AC', 'TV'],
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    adult: 2,
    children: 1,
    rating: 3
  }
];

// Features and facilities for filter
const allFeatures = ['King Bed', 'Queen Bed', 'Twin Beds', 'Balcony', 'Sea View', 'Mountain View', 'City View', 'Work Desk', 'Private Balcony', 'Ocean View', 'Basic Amenities'];
const allFacilities = ['AC', 'Room Service', 'TV', 'Mini Bar', 'Jacuzzi', 'High-speed WiFi', 'Champagne Service'];

const Rooms = () => {
  const [searchParams] = useSearchParams();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);

  useEffect(() => {
    // Parse search parameters if available
    if (searchParams.has('checkin')) {
      setCheckInDate(new Date(searchParams.get('checkin')));
    }
    if (searchParams.has('checkout')) {
      setCheckOutDate(new Date(searchParams.get('checkout')));
    }
    if (searchParams.has('adult')) {
      setAdult(parseInt(searchParams.get('adult')));
    }
    if (searchParams.has('children')) {
      setChildren(parseInt(searchParams.get('children')));
    }
    
    applyFilters();
  }, [searchParams]);

  const applyFilters = () => {
    let filtered = [...allRooms];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(room => 
        room.name.toLowerCase().includes(query) ||
        room.features.some(feature => feature.toLowerCase().includes(query)) ||
        room.facilities.some(facility => facility.toLowerCase().includes(query))
      );
    }
    
    // Filter by selected features
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(room => 
        selectedFeatures.every(feature => room.features.includes(feature))
      );
    }
    
    // Filter by selected facilities
    if (selectedFacilities.length > 0) {
      filtered = filtered.filter(room => 
        selectedFacilities.every(facility => room.facilities.includes(facility))
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(room => 
      room.price >= priceRange[0] && room.price <= priceRange[1]
    );
    
    // Filter by adult capacity
    if (adult) {
      filtered = filtered.filter(room => room.adult >= adult);
    }
    
    // Filter by children capacity
    if (children) {
      filtered = filtered.filter(room => room.children >= children);
    }
    
    setFilteredRooms(filtered);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    applyFilters();
  };

  const handleFeatureToggle = (feature) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const handleFacilityToggle = (facility) => {
    setSelectedFacilities(prev => 
      prev.includes(facility) 
        ? prev.filter(f => f !== facility)
        : [...prev, facility]
    );
  };

  const handlePriceChange = (e, index) => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => {
      const newRange = [...prev];
      newRange[index] = value;
      return newRange;
    });
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedFeatures([]);
    setSelectedFacilities([]);
    setPriceRange([0, 10000]);
    // Don't reset check-in/out, adult, children as they might come from URL
  };

  useEffect(() => {
    applyFilters();
  }, [searchQuery, selectedFeatures, selectedFacilities, priceRange, adult, children]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 h-font">OUR ROOMS</h2>
      
      {/* Search and filter controls */}
      <div className="mb-8 rounded-lg shadow-md p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h3 className="text-xl font-semibold mb-4 md:mb-0">Find Your Perfect Room</h3>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <FaFilter /> {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
        
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search rooms, features, or facilities..."
                  className="w-full p-2 pr-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-bg"
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  <FaSearch />
                </button>
              </div>
            </div>
            
            <div className="md:w-1/4">
              <select 
                value={adult}
                onChange={(e) => setAdult(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-bg"
              >
                <option value="">Adults (Any)</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}+ Adults</option>
                ))}
              </select>
            </div>
            
            <div className="md:w-1/4">
              <select 
                value={children}
                onChange={(e) => setChildren(parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-custom-bg"
              >
                <option value="0">Children (Any)</option>
                {[1, 2, 3, 4].map((num) => (
                  <option key={num} value={num}>{num}+ Children</option>
                ))}
              </select>
            </div>
          </div>
        </form>
        
        {showFilters && (
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">Min (₹)</label>
                    <input 
                      type="range" 
                      min="0" 
                      max="10000" 
                      step="500"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceChange(e, 0)}
                      className="w-full"
                    />
                    <span className="text-sm">₹{priceRange[0]}</span>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm text-gray-600 mb-1">Max (₹)</label>
                    <input 
                      type="range" 
                      min={priceRange[0]} 
                      max="10000" 
                      step="500"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceChange(e, 1)}
                      className="w-full"
                    />
                    <span className="text-sm">₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {allFeatures.map(feature => (
                    <button
                      key={feature}
                      type="button"
                      onClick={() => handleFeatureToggle(feature)}
                      className={`px-2 py-1 text-xs rounded-full ${
                        selectedFeatures.includes(feature) 
                          ? 'bg-custom-bg text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {feature}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Facilities</h4>
                <div className="flex flex-wrap gap-2">
                  {allFacilities.map(facility => (
                    <button
                      key={facility}
                      type="button"
                      onClick={() => handleFacilityToggle(facility)}
                      className={`px-2 py-1 text-xs rounded-full ${
                        selectedFacilities.includes(facility) 
                          ? 'bg-custom-bg text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {facility}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <button 
                type="button"
                onClick={resetFilters}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors mr-2"
              >
                Reset Filters
              </button>
              <button 
                type="button"
                onClick={applyFilters}
                className="px-4 py-2 bg-custom-bg text-white rounded-md hover:bg-opacity-90 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Check-in/out dates */}
      {(checkInDate || checkOutDate) && (
        <div className="mb-6 bg-blue-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium mb-2">Selected Dates</h3>
          <div className="flex flex-wrap gap-4">
            {checkInDate && (
              <div>
                <span className="font-medium">Check-in:</span> {checkInDate.toLocaleDateString()}
              </div>
            )}
            {checkOutDate && (
              <div>
                <span className="font-medium">Check-out:</span> {checkOutDate.toLocaleDateString()}
              </div>
            )}
            {adult > 0 && (
              <div>
                <span className="font-medium">Adults:</span> {adult}
              </div>
            )}
            {children > 0 && (
              <div>
                <span className="font-medium">Children:</span> {children}
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Rooms display */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.length > 0 ? (
          filteredRooms.map(room => (
            <RoomCard key={room.id} room={room} />
          ))
        ) : (
          <div className="col-span-3 text-center py-8">
            <h3 className="text-xl font-medium mb-2">No rooms found matching your criteria</h3>
            <p className="text-gray-600">Try adjusting your filters or search query.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Rooms; 