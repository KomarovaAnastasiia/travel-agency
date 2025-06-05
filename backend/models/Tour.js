const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: { type: String, required: true },
  destination: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  images: [{ type: String }]
});

tourSchema.index({ destination: 1, start_date: 1 });

module.exports = mongoose.model('Tour', tourSchema);
