const express = require('express');
const router = express.Router();
const Donation = require('../models/Donation');
const Request = require('../models/Request');

// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's donations by registration number
router.get('/user/:registrationNumber', async (req, res) => {
  try {
    const donations = await Donation.find({ registrationNumber: req.params.registrationNumber });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new donation
router.post('/', async (req, res) => {
  // Create the donation
  const donation = new Donation({
    requestId: req.body.requestId,
    requestTitle: req.body.requestTitle,
    requesterName: req.body.requesterName,
    requesterEmail: req.body.requesterEmail,
    requesterPhone: req.body.requesterPhone,
    quantity: req.body.quantity,
    condition: req.body.condition,
    notes: req.body.notes,
    donorName: req.body.donorName,
    donorEmail: req.body.donorEmail,
    donorPhone: req.body.donorPhone,
    registrationNumber: req.body.registrationNumber
  });

  try {
    // Save the donation
    const newDonation = await donation.save();
    
    // Update the request's donation count
    const request = await Request.findById(req.body.requestId);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    
    const newDonationCount = request.currentDonations + parseInt(req.body.quantity);
    const newStatus = newDonationCount >= request.itemsNeeded ? 'Fulfilled' : request.status;
    
    await Request.findByIdAndUpdate(
      req.body.requestId,
      { 
        currentDonations: newDonationCount,
        status: newStatus
      }
    );
    
    res.status(201).json(newDonation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;