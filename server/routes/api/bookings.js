// routes/api/bookings.js
const express = require('express');
const router = express.Router();

// @desc    Test route
// @route   GET /api/bookings
// @access  Public
router.get('/', (req, res) => {
  res.json({ message: 'Bookings route' });
});

module.exports = router;