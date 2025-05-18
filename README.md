# Hotel Booking System - Comprehensive Architecture

## Project Overview
This document outlines the architecture for a full-featured hotel booking platform using the MERN stack (MongoDB, Express.js, React.js, Node.js). The system is designed to be template-based, allowing for easy customization for different hotel clients while maintaining a robust set of core features.

## Technology Stack
- **Frontend**: React.js, Redux (state management), Material UI/Tailwind CSS (UI framework)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT, OAuth for social logins
- **File Storage**: AWS S3 or Firebase Storage
- **Payment Processing**: Stripe/PayPal
- **Deployment**: Docker, AWS/Vercel/Netlify
- **Testing**: Jest, React Testing Library
- **CI/CD**: GitHub Actions

## Project Structure

### Frontend Structure
```
client/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── assets/
│       └── images/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── styles/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   ├── Modal/
│   │   │   ├── Spinner/
│   │   │   └── FormElements/
│   │   ├── layout/
│   │   │   ├── Header/
│   │   │   ├── Footer/
│   │   │   ├── Sidebar/
│   │   │   └── Navigation/
│   │   ├── features/
│   │   │   ├── Authentication/
│   │   │   ├── HotelListing/
│   │   │   ├── RoomDetails/
│   │   │   ├── Booking/
│   │   │   ├── Payment/
│   │   │   ├── Reviews/
│   │   │   └── UserProfile/
│   │   └── admin/
│   │       ├── Dashboard/
│   │       ├── HotelManagement/
│   │       ├── BookingManagement/
│   │       ├── UserManagement/
│   │       └── ReportGeneration/
│   ├── pages/
│   │   ├── Home/
│   │   ├── Search/
│   │   ├── HotelDetails/
│   │   ├── RoomSelection/
│   │   ├── Booking/
│   │   ├── Payment/
│   │   ├── UserProfile/
│   │   ├── Authentication/
│   │   └── Admin/
│   ├── hooks/
│   │   ├── useAuth.js
│   │   ├── useForm.js
│   │   ├── useSearch.js
│   │   └── useBooking.js
│   ├── store/
│   │   ├── index.js
│   │   ├── slices/
│   │   │   ├── authSlice.js
│   │   │   ├── hotelSlice.js
│   │   │   ├── bookingSlice.js
│   │   │   └── uiSlice.js
│   │   └── thunks/
│   ├── utils/
│   │   ├── api.js
│   │   ├── formatters.js
│   │   ├── validators.js
│   │   └── helpers.js
│   ├── config/
│   │   ├── routes.js
│   │   ├── theme.js
│   │   └── constants.js
│   ├── contexts/
│   │   ├── ThemeContext.js
│   │   └── ConfigContext.js
│   ├── App.js
│   └── index.js
├── package.json
├── .env
└── README.md
```

### Backend Structure
```
server/
├── config/
│   ├── db.js
│   ├── passport.js
│   └── default.js
├── controllers/
│   ├── authController.js
│   ├── hotelController.js
│   ├── roomController.js
│   ├── bookingController.js
│   ├── userController.js
│   ├── reviewController.js
│   ├── paymentController.js
│   └── adminController.js
├── middleware/
│   ├── auth.js
│   ├── validation.js
│   ├── errorHandler.js
│   └── upload.js
├── models/
│   ├── User.js
│   ├── Hotel.js
│   ├── Room.js
│   ├── Booking.js
│   ├── Review.js
│   ├── Payment.js
│   └── Configuration.js
├── routes/
│   ├── api/
│   │   ├── auth.js
│   │   ├── hotels.js
│   │   ├── rooms.js
│   │   ├── bookings.js
│   │   ├── users.js
│   │   ├── reviews.js
│   │   ├── payments.js
│   │   └── admin.js
├── services/
│   ├── emailService.js
│   ├── paymentService.js
│   ├── uploadService.js
│   └── notificationService.js
├── utils/
│   ├── validators.js
│   ├── formatters.js
│   └── helpers.js
├── server.js
├── package.json
├── .env
└── README.md
```

## Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  password: String (hashed),
  phone: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  role: String (enum: ['user', 'admin', 'super-admin']),
  profilePicture: String (URL),
  bookings: [ObjectId] (ref: 'Booking'),
  reviews: [ObjectId] (ref: 'Review'),
  createdAt: Date,
  updatedAt: Date,
  preferences: {
    currency: String,
    language: String,
    notifications: Boolean
  },
  verified: Boolean,
  socialLogins: {
    google: String,
    facebook: String
  }
}
```

### Hotel Collection
```javascript
{
  _id: ObjectId,
  name: String,
  description: String,
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
    coordinates: {
      latitude: Number,
      longitude: Number
    }
  },
  rating: Number,
  images: [String] (URLs),
  amenities: [String],
  policies: {
    checkIn: String (time),
    checkOut: String (time),
    cancellation: String,
    children: String,
    pets: String
  },
  contactInfo: {
    phone: String,
    email: String,
    website: String
  },
  rooms: [ObjectId] (ref: 'Room'),
  reviews: [ObjectId] (ref: 'Review'),
  createdAt: Date,
  updatedAt: Date,
  featured: Boolean,
  active: Boolean,
  priceRange: {
    min: Number,
    max: Number
  },
  propertyType: String (enum: ['hotel', 'resort', 'villa', 'apartment']),
  themeConfig: {
    primaryColor: String,
    secondaryColor: String,
    logo: String (URL),
    fontFamily: String
  }
}
```

### Room Collection
```javascript
{
  _id: ObjectId,
  hotelId: ObjectId (ref: 'Hotel'),
  name: String,
  description: String,
  price: Number,
  discount: Number,
  capacity: {
    adults: Number,
    children: Number
  },
  amenities: [String],
  size: Number (sq ft/m),
  bedType: String,
  images: [String] (URLs),
  availability: {
    status: Boolean,
    bookedDates: [{
      startDate: Date,
      endDate: Date,
      bookingId: ObjectId (ref: 'Booking')
    }]
  },
  createdAt: Date,
  updatedAt: Date,
  active: Boolean,
  roomNumber: String,
  floor: Number,
  view: String
}
```

### Booking Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  hotelId: ObjectId (ref: 'Hotel'),
  roomId: ObjectId (ref: 'Room'),
  checkIn: Date,
  checkOut: Date,
  guests: {
    adults: Number,
    children: Number
  },
  totalPrice: Number,
  status: String (enum: ['pending', 'confirmed', 'cancelled', 'completed']),
  paymentId: ObjectId (ref: 'Payment'),
  specialRequests: String,
  createdAt: Date,
  updatedAt: Date,
  bookingReference: String,
  contactInfo: {
    name: String,
    email: String,
    phone: String
  },
  cancellationReason: String,
  hasReviewed: Boolean
}
```

### Review Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: 'User'),
  hotelId: ObjectId (ref: 'Hotel'),
  bookingId: ObjectId (ref: 'Booking'),
  rating: Number,
  title: String,
  comment: String,
  images: [String] (URLs),
  createdAt: Date,
  updatedAt: Date,
  likes: Number,
  status: String (enum: ['pending', 'approved', 'rejected']),
  reply: {
    comment: String,
    createdAt: Date
  }
}
```

### Payment Collection
```javascript
{
  _id: ObjectId,
  bookingId: ObjectId (ref: 'Booking'),
  userId: ObjectId (ref: 'User'),
  amount: Number,
  currency: String,
  method: String (enum: ['credit_card', 'paypal', 'bank_transfer']),
  status: String (enum: ['pending', 'completed', 'failed', 'refunded']),
  transactionId: String,
  paymentDate: Date,
  refundAmount: Number,
  refundDate: Date,
  createdAt: Date,
  updatedAt: Date,
  paymentDetails: Object (provider-specific details),
  invoiceUrl: String
}
```

### Configuration Collection
```javascript
{
  _id: ObjectId,
  hotelId: ObjectId (ref: 'Hotel'),
  siteTitle: String,
  logo: {
    light: String (URL),
    dark: String (URL)
  },
  colors: {
    primary: String,
    secondary: String,
    accent: String,
    background: String,
    text: String
  },
  fonts: {
    headings: String,
    body: String
  },
  contactInfo: {
    email: String,
    phone: String,
    address: String,
    socialMedia: {
      facebook: String,
      twitter: String,
      instagram: String
    }
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  featuredRooms: [ObjectId] (ref: 'Room'),
  enabledFeatures: {
    reviews: Boolean,
    booking: Boolean,
    payment: Boolean,
    newsletters: Boolean
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Core Features

### User-Facing Features
1. **User Authentication & Profile Management**
   - Registration, login, password reset
   - Social login (Google, Facebook)
   - Profile management
   - Booking history

2. **Hotel Search & Filtering**
   - Advanced search with filters (location, date, guests, price range)
   - Map-based search
   - Sort by popularity, price, rating
   - Save favorite hotels

3. **Hotel & Room Details**
   - Photo gallery with high-resolution images
   - Detailed amenities list
   - Room type comparison
   - Availability calendar
   - Customer reviews and ratings
   - Location map and nearby attractions

4. **Booking System**
   - Real-time availability checking
   - Room selection
   - Guest information form
   - Special requests
   - Booking modification and cancellation

5. **Payment Processing**
   - Multiple payment methods
   - Secure payment gateway
   - Discount codes and promotions
   - Payment confirmation
   - Invoice generation

6. **Review & Rating System**
   - Post-stay review submission
   - Photo upload with reviews
   - Rating different aspects (cleanliness, service, etc.)
   - Helpful review voting

7. **Notifications & Communication**
   - Email confirmations
   - Booking reminders
   - Special offers
   - Check-in instructions

8. **Customer Support**
   - Live chat support
   - FAQ section
   - Contact form
   - Help center

### Admin Features
1. **Dashboard**
   - Performance metrics
   - Booking statistics
   - Revenue analysis
   - User growth
   - Recent activities

2. **Hotel Management**
   - Add/edit hotel details
   - Room management
   - Pricing and availability control
   - Promotional offers
   - Photo management

3. **Booking Management**
   - View all bookings
   - Filter and search bookings
   - Modify booking status
   - Handle special requests
   - Send custom notifications

4. **User Management**
   - View all users
   - User roles and permissions
   - Customer history
   - Communication log

5. **Review Management**
   - Moderate reviews
   - Respond to reviews
   - Review analytics

6. **Payment Management**
   - Transaction history
   - Refund processing
   - Payment reports
   - Issue invoices

7. **Content Management**
   - Edit static pages
   - Manage blog posts
   - FAQ management
   - Email template customization

8. **Settings & Configuration**
   - Site customization (colors, logo, etc.)
   - Email settings
   - Payment gateway configuration
   - Integration settings (Google Analytics, etc.)
   - General settings

9. **Reports**
   - Financial reports
   - Occupancy reports
   - Customer acquisition reports
   - Export to CSV/PDF

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout
- `GET /api/auth/verify/:token` - Verify email

### Hotels
- `GET /api/hotels` - Get all hotels
- `GET /api/hotels/:id` - Get hotel by ID
- `POST /api/hotels` - Create a hotel (admin)
- `PUT /api/hotels/:id` - Update hotel (admin)
- `DELETE /api/hotels/:id` - Delete hotel (admin)
- `GET /api/hotels/featured` - Get featured hotels
- `GET /api/hotels/search` - Search hotels by criteria

### Rooms
- `GET /api/hotels/:hotelId/rooms` - Get all rooms for a hotel
- `GET /api/rooms/:id` - Get room by ID
- `POST /api/hotels/:hotelId/rooms` - Create a room (admin)
- `PUT /api/rooms/:id` - Update room (admin)
- `DELETE /api/rooms/:id` - Delete room (admin)
- `GET /api/rooms/available` - Check room availability
- `GET /api/rooms/:id/availability` - Get availability for a specific room

### Bookings
- `GET /api/bookings` - Get all bookings (admin)
- `GET /api/bookings/me` - Get user's bookings
- `GET /api/bookings/:id` - Get booking by ID
- `POST /api/bookings` - Create a booking
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Cancel booking
- `GET /api/bookings/stats` - Get booking statistics (admin)

### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID (admin)
- `PUT /api/users/me` - Update current user
- `PUT /api/users/:id` - Update user (admin)
- `DELETE /api/users/:id` - Delete user (admin)

### Reviews
- `GET /api/hotels/:hotelId/reviews` - Get all reviews for a hotel
- `GET /api/reviews/:id` - Get review by ID
- `POST /api/hotels/:hotelId/reviews` - Create a review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review
- `POST /api/reviews/:id/reply` - Reply to a review (admin)

### Payments
- `POST /api/payments/create-intent` - Create payment intent
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/:id` - Get payment details
- `POST /api/payments/:id/refund` - Process refund (admin)
- `GET /api/payments/stats` - Get payment statistics (admin)

### Admin
- `GET /api/admin/dashboard` - Get dashboard data
- `GET /api/admin/reports/revenue` - Get revenue reports
- `GET /api/admin/reports/occupancy` - Get occupancy reports
- `GET /api/admin/reports/customers` - Get customer reports
- `PUT /api/admin/settings` - Update site settings
- `GET /api/admin/settings` - Get site settings

## Technologies & Libraries

### Frontend
- React.js
- Redux Toolkit (state management)
- React Router (routing)
- Material UI/Tailwind CSS (UI components)
- Axios (API requests)
- Formik/React Hook Form (form handling)
- Yup (validation)
- React Query (data fetching)
- React-datepicker (calendar)
- Mapbox/Google Maps (map integration)
- Chart.js (analytics visualization)
- i18next (internationalization)

### Backend
- Node.js
- Express.js
- Mongoose (MongoDB ODM)
- JSON Web Token (authentication)
- Bcrypt (password hashing)
- Multer (file uploads)
- Nodemailer (email sending)
- Stripe/PayPal SDK (payment processing)
- Joi (validation)
- Winston (logging)
- Morgan (HTTP request logging)
- Helmet (security headers)
- CORS (Cross-Origin Resource Sharing)
- Express-rate-limit (rate limiting)
- Cloudinary/AWS SDK (cloud storage)

### Testing & Development
- Jest (testing)
- React Testing Library (component testing)
- Supertest (API testing)
- Prettier (code formatting)
- ESLint (code linting)
- Husky (git hooks)
- Nodemon (development server)
- Concurrently (running multiple commands)

## Performance Considerations
- Implement lazy loading for images
- Use pagination for listing pages
- Implement caching strategies (Redis)
- Optimize database queries with indexes
- Use CDN for static assets
- Implement code splitting
- Server-side rendering for SEO pages
- Implement progressive web app features

## Security Considerations
- Implement proper authentication and authorization
- Use HTTPS for all connections
- Implement CSRF protection
- Validate and sanitize all inputs
- Use secure HTTP headers
- Implement rate limiting
- Regular security audits
- Secure payment processing
- Data encryption for sensitive information
- Regular backups
- GDPR compliance

## Scalability Considerations
- Microservices architecture (future)
- Database sharding
- Load balancing
- Horizontal scaling
- Caching layers
- CDN for global distribution
- Serverless functions for specific operations
- Queue systems for heavy operations

