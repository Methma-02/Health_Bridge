const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// Get dashboard statistics
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find();
    
    const stats = {
      totalDonations: requests.reduce((acc, req) => acc + req.currentDonations, 0),
      activeRequests: requests.filter(req => req.status === 'Active' || req.status === 'Urgent').length,
      mothersHelped: requests.filter(req => req.status === 'Fulfilled').length,
      itemsNeeded: requests.reduce((acc, req) => {
        if (req.status !== 'Fulfilled') {
          return acc + (req.itemsNeeded - req.currentDonations);
        }
        return acc;
      }, 0)
    };
    
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;