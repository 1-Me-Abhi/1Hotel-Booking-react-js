# Hotel Booking Application

![Hotel Booking Banner](https://source.unsplash.com/random/1200x200/?hotel,luxury)

A modern hotel booking platform built with React, featuring a responsive design with Tailwind CSS and dynamic animations with Framer Motion.

## 🌟 Features

- **User Authentication**
  - Email/Password registration and login
  - Google authentication integration
  - Password reset functionality
  - Profile management

- **Room Booking System**
  - Browse available rooms with detailed information
  - Advanced filtering options (price, capacity, amenities)
  - Real-time availability checking
  - Secure checkout process

- **User Dashboard**
  - View and manage bookings
  - Update profile information
  - Change password
  - View booking history

- **Admin Control Panel**
  - Comprehensive hotel management
  - Booking oversight and management
  - User account administration
  - Analytics and reporting tools
  - Role-based access control

- **Enhanced UI/UX**
  - Responsive design for all devices
  - Dark/Light mode toggle
  - Smooth animations and transitions
  - Modern, clean interface

## 🏗️ Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── context/       # React context providers
├── hooks/         # Custom React hooks
├── utils/         # Utility functions
├── assets/        # Static assets (images, icons)
└── styles/        # Global styles and Tailwind configuration
```

## 🔒 Security Measures

### Authentication & Authorization
- **JWT-based Authentication**
  - Secure token-based authentication system
  - Token expiration and refresh mechanism
  - Protected routes with middleware validation
  - Secure password hashing using bcrypt

- **Role-Based Access Control (RBAC)**
  - Granular permission system for users and admins
  - Protected admin routes with middleware
  - Secure admin privilege management
  - Activity logging for audit purposes

### Data Security
- **MongoDB Security**
  - Strict access control for database collections
  - User data isolation and protection
  - Admin-only write access to critical collections
  - Public read-only access for non-sensitive data

- **Input Validation & Sanitization**
  - Comprehensive form validation
  - Data sanitization before database operations
  - Protection against SQL injection
  - XSS prevention measures

### API Security
- **Protected Endpoints**
  - Authentication middleware for API routes
  - Rate limiting to prevent abuse
  - CORS configuration for secure cross-origin requests
  - Request validation and sanitization

### Error Handling & Logging
- **Secure Error Management**
  - Custom error handling middleware
  - Secure error messages (no sensitive data exposure)
  - Comprehensive logging system
  - Error tracking and monitoring

### Additional Security Features
- **Session Management**
  - Secure session handling
  - Automatic session timeout
  - Concurrent session control
  - Session invalidation on logout

- **Data Protection**
  - Encrypted data transmission (HTTPS)
  - Secure password storage
  - Regular security audits
  - Automated backup systems

## 🚀 Recent Improvements

### Enhanced Security Features
- Implemented comprehensive JWT authentication system
- Added role-based access control for admin features
- Enhanced MongoDB security rules for better data protection
- Implemented secure password hashing with bcrypt
- Added input validation and sanitization across all forms
- Implemented secure session management
- Added rate limiting for API endpoints
- Enhanced error handling with secure error messages

### Authentication & Authorization
- Improved JWT token management
- Enhanced password reset functionality
- Added multi-factor authentication support
- Implemented secure session handling
- Added role-based access control improvements

### Data Protection
- Enhanced data encryption in transit
- Improved secure storage practices
- Added automated security monitoring
- Implemented regular security audits
- Enhanced backup and recovery procedures

### Performance & Reliability
- Optimized database queries
- Improved caching mechanisms
- Enhanced error recovery systems
- Added comprehensive logging
- Implemented automated testing

## 🛠️ Technologies Used

- **React 19** - Frontend library for building user interfaces
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Router DOM** - Routing library for React
- **React Icons** - Icon library
- **React DatePicker** - Date selection component
- **Swiper** - Modern touch slider

## 👑 Admin System

The application includes an admin dashboard for managing the hotel system. Only users with admin privileges can access this feature.

### Features of the Admin Dashboard
- Comprehensive overview of bookings, users, and rooms
- User management
- Bookings management
- Room management

### How to Make a User an Admin
To grant admin privileges to a user:

1. The user must first register and have an account
2. Access the MongoDB database
3. Find the 'users' collection
4. Locate the document corresponding to the user you want to make an admin
5. Update the document and set `isAdmin: true`
6. Save the changes

Once set as an admin, the user will see an "Admin Dashboard" option in their profile dropdown menu.

### Security
- Admin routes are protected on both client and server sides:
  - **Client-side Protection**:
    - Protected route components using React Router
    - Route guards that check for admin status before rendering
    - Automatic redirection to login page for unauthorized access
    - Admin status verification through JWT token validation
    - Secure storage of admin status in protected context

  - **Server-side Protection**:
    - JWT-based authentication middleware
    - Role-based access control middleware
    - Admin-specific API endpoints with additional validation
    - Request validation and sanitization
    - Secure session management
    - Rate limiting for admin routes
    - IP-based access restrictions (optional)
    - Activity logging for audit purposes

- MongoDB security rules ensure that only admin users can perform administrative actions
- Non-admin users attempting to access the admin dashboard will be redirected

## 🔧 Setup and Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/hotel-booking-react.git
cd hotel-booking-react
```

2. Install dependencies
```bash
npm install
```

3. Set up the backend
- Create a MongoDB database
- Set up environment variables in `.env` file:
  ```
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  PORT=5000
  ```
- Start the backend server:
  ```bash
  cd backend
  npm install
  npm start
  ```

4. Start the development server
```bash
npm start
```

## 📦 Deployment

Build the application for production:
```bash
npm run build
```

The build artifacts will be stored in the `build/` directory, ready to be deployed to your hosting provider of choice.

## 🔍 Error Handling and Troubleshooting

The application includes comprehensive error handling:

- Network connection issues detection
- JWT authentication error handling
- MongoDB database operation retries
- User-friendly error messages
- Detailed console logging for developers

## 👑 Admin Dashboard

The application includes a secure admin dashboard accessible only to authorized administrators. This dashboard provides powerful tools for managing the hotel booking system.

### Access Control
- Role-based authentication system
- Secure admin routes with protected middleware
- IP-based access restrictions (optional)
- Activity logging for audit purposes

### Dashboard Features
- **Hotel Management**
  - Add/edit/remove room listings
  - Update room availability
  - Manage room categories and amenities
  - Set pricing and special offers

- **Booking Management**
  - View all bookings in real-time
  - Filter and search bookings by various parameters
  - Process booking approvals/rejections
  - Handle cancellations and refunds

- **User Management**
  - View and manage user accounts
  - Handle user verification
  - Address customer support requests
  - Send notifications to specific users

- **Analytics & Reporting**
  - Booking statistics and trends
  - Revenue reports and forecasting
  - Occupancy rate visualization
  - User demographics analysis

### Technical Implementation
- Separate React component tree for admin interface
- Custom hooks for admin-specific functionality
- Enhanced security rules on MongoDB
- Admin-specific API endpoints with additional validation

To access the admin dashboard, navigate to `/admin` after logging in with an administrator account. First-time setup requires configuring admin roles through the database.

## 🔮 Future Enhancements

### User & Admin Experience
- **User Role Management** - Admin ability to promote users to admin status directly from the dashboard
- **Room Management Interface** - Form in admin dashboard to add/edit rooms with image upload capabilities
- **Booking Approval System** - Admin functionality to approve, reject, or cancel bookings with email notifications
- **Reports & Analytics** - Enhanced dashboard with booking trends and revenue visualizations

### Technology & Features
- **Payment Gateway Integration** - Integration with Stripe, PayPal for processing booking payments
- **Email Notifications** - Automated emails for booking confirmations, reminders, and receipts
- **Multi-language Support** - Internationalization (i18n) for supporting multiple languages
- **Review & Rating System** - Allow users to leave reviews and ratings for rooms they've booked
- **Discount & Promo Code System** - Functionality to create and apply promotional codes
- **Progressive Web App Features** - Offline capabilities and improved mobile experience
- **AI-powered Booking Recommendations** - Personalized room suggestions based on user preferences

### Quality & Performance
- **Responsive Design Improvements** - Full responsiveness on all device sizes
- **Testing Suite** - Unit and integration tests to ensure application reliability
- **Mobile App Version** - React Native implementation for iOS and Android

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Contributors

- [Abhishek](https://github.com/1-Me-Abhi) - Lead Developer

## 👁️ Screenshots

Here are some previews of the application:

### Home Page
![Home Page](./screenshots/Screenshot%202025-04-15%20144629.png)

### Room Listings
![Room Listings](./screenshots/Screenshot%202025-04-15%20144738.png)

### Room Details
![Room Details](./screenshots/Screenshot%202025-04-15%20144811.png)

### Booking Process
![Booking Process](./screenshots/Screenshot%202025-04-15%20144840.png)

### User Profile
![User Profile](./screenshots/Screenshot%202025-04-15%20144910.png)

### Admin Dashboard
![Admin Dashboard](./screenshots/Screenshot%202025-04-15%20145641.png)
