const mongoose = require('mongoose');
const Room = require('./models/Room');

const sampleRooms = [
  {
    roomNumber: '101',
    type: 'Standard Room',
    price: 2499,
    capacity: 2,
    amenities: ['King Bed', 'Balcony', 'Sea View'],
    images: [
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    ],
    description: 'Our Standard Room offers a comfortable stay with modern amenities. Enjoy the view from your private balcony overlooking the sea, and relax in the king-sized bed after a day of exploration. Perfect for couples or solo travelers looking for a cozy retreat.',
    isAvailable: true
  },
  {
    roomNumber: '201',
    type: 'Deluxe Suite',
    price: 3499,
    capacity: 2,
    amenities: ['King Bed', 'Balcony', 'City View'],
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    ],
    description: 'Experience luxury in our Deluxe Suite, offering a spacious layout with a separate sitting area. Enjoy the panoramic city views from your private balcony, and indulge in the convenience of a fully stocked mini bar. Ideal for those seeking a touch of elegance during their stay.',
    isAvailable: true
  },
  {
    roomNumber: '301',
    type: 'Family Suite',
    price: 4999,
    capacity: 4,
    amenities: ['2 Queen Beds', 'Balcony', 'Mountain View'],
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1174&q=80'
    ],
    description: 'Our Family Suite is perfect for families traveling together. With two queen beds and a spacious layout, there\'s room for everyone to relax. Enjoy the mountain view from your balcony, or unwind in the jacuzzi after a day of activities. A home away from home for your family vacation.',
    isAvailable: true
  },
  {
    roomNumber: '401',
    type: 'Executive Suite',
    price: 5999,
    capacity: 2,
    amenities: ['King Bed', 'Private Terrace', 'Ocean View', 'Mini Bar', 'Work Desk'],
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
    ],
    description: 'The Executive Suite offers the perfect blend of luxury and functionality. Featuring a spacious bedroom with a king bed, a private terrace with stunning ocean views, and a dedicated work area. Ideal for business travelers who don\'t want to compromise on comfort.',
    isAvailable: true
  },
  {
    roomNumber: '501',
    type: 'Presidential Suite',
    price: 8999,
    capacity: 4,
    amenities: ['2 King Beds', 'Private Pool', 'Panoramic View', 'Butler Service', 'Private Dining Area'],
    images: [
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1591088398332-8a7791972843?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80'
    ],
    description: 'Experience unparalleled luxury in our Presidential Suite. This expansive suite features two king bedrooms, a private infinity pool, and panoramic views of the city and ocean. Enjoy personalized butler service and a private dining area for an exclusive dining experience.',
    isAvailable: true
  },
  {
    roomNumber: '601',
    type: 'Garden Villa',
    price: 7499,
    capacity: 6,
    amenities: ['3 Queen Beds', 'Private Garden', 'Outdoor Jacuzzi', 'BBQ Area', 'Kitchen'],
    images: [
      'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1590490359683-658d3d23f972?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    ],
    description: 'Our Garden Villa offers a unique blend of indoor and outdoor living. Perfect for larger groups or families, this villa features three queen bedrooms, a fully equipped kitchen, and a beautiful private garden with an outdoor jacuzzi and BBQ area. Enjoy the perfect balance of privacy and luxury.',
    isAvailable: true
  }
];

const seedRooms = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hotel-booking');
    console.log('Connected to MongoDB');

    // Clear existing rooms
    await Room.deleteMany({});
    console.log('Cleared existing rooms');

    // Insert sample rooms
    await Room.insertMany(sampleRooms);
    console.log('Added sample rooms');

    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error seeding rooms:', error);
    process.exit(1);
  }
};

seedRooms(); 