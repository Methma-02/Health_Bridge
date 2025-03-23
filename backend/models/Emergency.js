const mongoose = require('mongoose'); 


const EmergencySchema = new mongoose.Schema({
  // Remove userId or make it optional
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Make it optional
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

const Emergency = mongoose.model('Emergency', EmergencySchema);
module.exports = Emergency;