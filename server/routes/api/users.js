// routes/api/users.js
const express = require('express');
const router = express.Router();

// @desc    Test route
// @route   GET /api/users
// @access  Public
router.get('/', (req, res) => {
  res.json({ message: 'Users route' });
});

module.exports = router;