import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import { FaSearch, FaFilter } from 'react-icons/fa';
import axios from 'axios';

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}/rooms`);
        setRooms(response.data);
        setFilteredRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setError('Failed to load rooms');
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

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
  }, [searchParams]);

  const applyFilters = () => {
    let filtered = [...rooms];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(room => 
        room.type.toLowerCase().includes(query) ||
        room.amenities.some(amenity => amenity.toLowerCase().includes(query))
      );
    }
    
    // Filter by selected features
    if (selectedFeatures.length > 0) {
      filtered = filtered.filter(room => 
        selectedFeatures.every(feature => room.amenities.includes(feature))
      );
    }
    
    // Filter by selected facilities
    if (selectedFacilities.length > 0) {
      filtered = filtered.filter(room => 
        selectedFacilities.every(facility => ['AC', 'Room Service', 'TV'].includes(facility))
      );
    }
    
    // Filter by price range
    filtered = filtered.filter(room => 
      room.price >= priceRange[0] && room.price <= priceRange[1]
    );
    
    // Filter by adult capacity
    if (adult) {
      filtered = filtered.filter(room => room.capacity >= adult);
    }
    
    // Filter by children capacity
    if (children) {
      filtered = filtered.filter(room => Math.floor(room.capacity / 2) >= children);
    }

    // Filter by check-in and check-out dates
    if (checkInDate && checkOutDate) {
      filtered = filtered.filter(room => room.isAvailable);
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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="flex justify-center items-center h-64">
          <div className="w-16 h-16 border-4 border-custom-bg border-t-transparent rounded-full animate-spin"></div>
        </div>
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
      <h1 className="text-3xl font-bold mb-8">Our Rooms</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRooms.map((room) => (
          <RoomCard 
            key={room._id} 
            room={{
              id: room._id,
              name: room.type,
              price: room.price,
              features: room.amenities,
              facilities: ['AC', 'Room Service', 'TV'], // Add these to your room model if needed
              image: room.images[0],
              adult: room.capacity,
              children: Math.floor(room.capacity / 2),
              rating: 4 // Add this to your room model if needed
            }} 
          />
        ))}
      </div>
    </div>
  );
};

export default Rooms; 