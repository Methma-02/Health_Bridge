const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  requestId: {
    type: String,
    required: true
  },
  requestTitle: {
    type: String,
    required: true
  },
  requesterName: {
    type: String,
    required: true
  },
  requesterEmail: {
    type: String,
    required: true
  },
  requesterPhone: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  condition: {
    type: String,
    enum: ['New', 'Like New', 'Gently Used'],
    default: 'New'
  },
  date: {
    type: String,
    default: () => new Date().toLocaleDateString()
  },
  notes: {
    type: String
  },
  donorName: {
    type: String,
    required: true
  },
  donorEmail: {
    type: String,
    required: true
  },
  donorPhone: {
    type: String,
    required: true
  },
  registrationNumber: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('donations', donationSchema);