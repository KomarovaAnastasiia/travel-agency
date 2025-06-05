const express = require('express');
const router = express.Router();
const { getTours, createTour, getTour, updateTour, deleteTour } = require('../controllers/tourController');
const auth = require('../middleware/auth');

// Public
router.get('/', getTours);
router.get('/:id', getTour);

// Admin only
router.post('/', auth, createTour);
router.put('/:id', auth, updateTour);
router.delete('/:id', auth, deleteTour);

module.exports = router;
