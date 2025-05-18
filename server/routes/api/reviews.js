// routes/api/reviews.js
const express = require('express');
const router = express.Router();

// @desc    Test route
// @route   GET /api/reviews
// @access  Public
router.get('/', (req, res) => {
  res.json({ message: 'Reviews route' });
});

module.exports = router;