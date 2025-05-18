// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorHandler');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// API Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/hotels', require('./routes/api/hotels'));
app.use('/api/rooms', require('./routes/api/rooms'));
app.use('/api/bookings', require('./routes/api/bookings'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/reviews', require('./routes/api/reviews'));

// Route for checking API status
app.get('/api/status', (req, res) => {
  res.json({ message: 'API is running' });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});