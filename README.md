# Hotel Booking System

![Hotel Booking Banner](https://source.unsplash.com/random/1200x200/?hotel,luxury)

A modern hotel booking platform built with React and Firebase, featuring a responsive design with Tailwind CSS and dynamic animations with Framer Motion.

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
├── components/         # Reusable UI components
│   ├── LoginModal.jsx     # Authentication modals 
│   ├── RegisterModal.jsx
│   ├── Navbar.jsx         # Navigation component
│   ├── RoomCard.jsx       # Room display component
│   └── ...
├── context/           # React Context API implementations
│   └── AuthContext.jsx    # Authentication state management
├── firebase/          # Firebase configuration and services
│   ├── config.js          # Firebase initialization
│   └── userService.js     # User data management functions
├── pages/             # Application pages
│   ├── Home.jsx           # Landing page
│   ├── Rooms.jsx          # Room listing page
│   ├── RoomDetails.jsx    # Individual room view
│   ├── Profile.jsx        # User profile management
│   ├── Bookings.jsx       # User booking management
│   ├── Checkout.jsx       # Booking checkout process
│   └── ...
├── admin/             # Admin dashboard components
│   ├── Dashboard.jsx      # Main admin dashboard
│   ├── RoomManager.jsx    # Room management interface
│   ├── BookingManager.jsx # Booking management interface
│   ├── UserManager.jsx    # User management interface
│   └── Analytics.jsx      # Statistics and reporting
└── App.js             # Main application component
```

## 🚀 Recent Improvements

### Enhanced Authentication Flow
- Improved error handling for authentication processes
- Added retry mechanism for failed operations
- More descriptive error messages for users

### Robust Profile Management
- Enhanced profile data loading with retry mechanism
- Improved error handling with user-friendly error messages
- Added fallback to local authentication data when Firestore fails
- Dismissible error banners for better UX

### Firebase Integration
- Added connection state monitoring
- Implemented error boundaries for Firebase operations
- Added timeouts for database operations to prevent hanging requests
- Improved data persistence and synchronization

### UI/UX Enhancements
- Added loading states for all asynchronous operations
- Improved form validation with real-time feedback
- Enhanced accessibility across the application
- Optimized animations for better performance

## 🛠️ Technologies Used

- **React 19** - Frontend library for building user interfaces
- **Firebase** - Backend services including:
  - Authentication
  - Firestore Database
  - Cloud Functions
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
2. Access the Firebase Console (https://console.firebase.google.com/)
3. Navigate to Firestore Database
4. Find the 'users' collection
5. Locate the document corresponding to the user you want to make an admin
6. Edit the document and add a field `isAdmin` with value `true`
7. Save the changes

Once set as an admin, the user will see an "Admin Dashboard" option in their profile dropdown menu.

### Security
- Admin routes are protected on both client and server sides
- Firestore security rules ensure that only admin users can perform administrative actions
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

3. Set up Firebase
- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable Authentication (Email/Password and Google)
- Create a Firestore database
- Copy your Firebase configuration
- Follow the instructions in `FIREBASE_SETUP.md`

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
- Firebase authentication error handling
- Firestore database operation retries
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
- Enhanced security rules on Firebase
- Admin-specific API endpoints with additional validation

To access the admin dashboard, navigate to `/admin` after logging in with an administrator account. First-time setup requires configuring admin roles through Firebase Authentication custom claims.

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
