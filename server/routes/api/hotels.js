// routes/api/hotels.js
const express = require('express');
const router = express.Router();

// @desc    Test route
// @route   GET /api/hotels
// @access  Public
router.get('/', (req, res) => {
  res.json({ message: 'Hotels route' });
});

module.exports = router;