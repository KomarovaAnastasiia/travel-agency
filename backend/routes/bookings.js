const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings, updateBooking } = require('../controllers/bookingController');
const auth = require('../middleware/auth');

// Protected routes
router.post('/', auth, createBooking);
router.get('/user/:userId', auth, getUserBookings);
router.put('/:id', auth, updateBooking);

module.exports = router;
