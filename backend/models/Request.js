const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Urgent', 'Fulfilled'],
    default: 'Active'
  },
  userName: {
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
  dueDate: {
    type: String,
    required: true
  },
  datePosted: {
    type: String,
    default: () => new Date().toLocaleDateString()
  },
  itemsNeeded: {
    type: Number,
    required: true,
    min: 1
  },
  currentDonations: {
    type: Number,
    default: 0
  },
  itemCondition: {
    type: String,
    enum: ['New', 'Like New', 'Gently Used', 'Any'],
    default: 'New'
  },
  registrationNumber: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('donation_requests', requestSchema);