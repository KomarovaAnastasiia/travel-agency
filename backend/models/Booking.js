const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tour_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Tour', required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  booking_date: { type: Date, required: true },
  persons: { type: Number, required: true, min: 1 },
  services: [{ type: String }],
  status: { type: String, enum: ['confirmed', 'cancelled'], default: 'confirmed' }
});

module.exports = mongoose.model('Booking', bookingSchema);
