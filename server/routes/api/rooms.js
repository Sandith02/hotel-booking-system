// routes/api/rooms.js
const express = require('express');
const router = express.Router();

// @desc    Test route
// @route   GET /api/rooms
// @access  Public
router.get('/', (req, res) => {
  res.json({ message: 'Rooms route' });
});

module.exports = router;