const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// Get all requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find();
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user's requests by registration number
router.get('/user/:registrationNumber', async (req, res) => {
  try {
    const requests = await Request.find({ registrationNumber: req.params.registrationNumber });
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific request
router.get('/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    res.json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new request
router.post('/', async (req, res) => {
  const request = new Request({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status || 'Active',
    userName: req.body.requesterName,
    requesterEmail: req.body.requesterEmail,
    requesterPhone: req.body.requesterPhone,
    dueDate: req.body.dueDate,
    itemsNeeded: req.body.itemsNeeded,
    currentDonations: 0,
    itemCondition: req.body.itemCondition,
    registrationNumber: req.body.registrationNumber
  });

  try {
    const newRequest = await request.save();
    res.status(201).json(newRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a request
router.patch('/:id', async (req, res) => {
  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        userName: req.body.requesterName,
        requesterEmail: req.body.requesterEmail,
        requesterPhone: req.body.requesterPhone,
        dueDate: req.body.dueDate,
        itemsNeeded: req.body.itemsNeeded,
        itemCondition: req.body.itemCondition
      },
      { new: true }
    );
    
    if (!updatedRequest) return res.status(404).json({ message: 'Request not found' });
    res.json(updatedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update request status
router.patch('/:id/status', async (req, res) => {
  try {
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    
    if (!updatedRequest) return res.status(404).json({ message: 'Request not found' });
    res.json(updatedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update donation count
router.patch('/:id/donate', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    
    const newDonationCount = request.currentDonations + parseInt(req.body.quantity);
    const newStatus = newDonationCount >= request.itemsNeeded ? 'Fulfilled' : request.status;
    
    const updatedRequest = await Request.findByIdAndUpdate(
      req.params.id,
      { 
        currentDonations: newDonationCount,
        status: newStatus
      },
      { new: true }
    );
    
    res.json(updatedRequest);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;