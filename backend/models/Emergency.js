// backend/models/Emergency.js
const mongoose = require('mongoose');

const EmergencySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'canceled', 'completed'],
    default: 'pending'
  },
  additionalInfo: {
    type: String
  },
  acceptedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    default: null
  },
  notifiedHospitals: [{
    hospitalId: String,
    name: String,
    notifiedAt: Date,
    response: {
      type: String,
      enum: ['pending', 'accepted', 'declined'],
      default: 'pending'
    },
    responseTime: Date
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Index for geospatial queries
EmergencySchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Emergency', EmergencySchema);