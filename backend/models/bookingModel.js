const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  phone:   { type: String, required: true },
  email:   { type: String, required: true },
  persons: { type: String, required: true },
  date:    { type: String, required: true },
  status:  { type: String, default: 'Pending' } // Pending / Confirmed / Cancelled
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);