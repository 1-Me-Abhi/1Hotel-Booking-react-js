# Hotel Booking Backend

This is the backend server for the Hotel Booking application, built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/hotel-booking
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

3. Start MongoDB service on your machine

4. Run the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/reset-password` - Request password reset

### Users
- GET `/api/users/profile` - Get user profile (authenticated)
- PATCH `/api/users/profile` - Update user profile (authenticated)

### Rooms
- GET `/api/rooms` - Get all rooms
- GET `/api/rooms/:id` - Get room by ID
- POST `/api/rooms` - Create new room (admin only)
- PATCH `/api/rooms/:id` - Update room (admin only)
- DELETE `/api/rooms/:id` - Delete room (admin only)
- GET `/api/rooms/available` - Get available rooms for date range

### Bookings
- GET `/api/bookings` - Get all bookings (admin only)
- GET `/api/bookings/my-bookings` - Get user's bookings (authenticated)
- POST `/api/bookings` - Create new booking (authenticated)
- PATCH `/api/bookings/:id/status` - Update booking status (admin only)
- PATCH `/api/bookings/:id/checkout` - Process checkout (admin only)
- PATCH `/api/bookings/:id/payment` - Update payment status (admin only)
- DELETE `/api/bookings/:id` - Cancel booking (authenticated)

#### Booking Status
- `confirmed` - Booking is active and confirmed
- `cancelled` - Booking has been cancelled
- `completed` - Guest has checked out

#### Payment Status
- `paid` - Payment has been received
- `pending` - Payment is pending
- `refunded` - Payment has been refunded (usually after cancellation)

#### Booking Features
- Automatic room availability management
- Total price calculation based on number of nights
- Special requests handling
- Automatic status updates
- Payment status tracking
- Checkout processing
- Booking cancellation with refund handling

## Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-token>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages in the following format:

```json
{
  "message": "Error message here"
}
```

## Development

- The server runs on port 5000 by default
- MongoDB connection is established automatically
- Nodemon is used for development to automatically restart the server on file changes 