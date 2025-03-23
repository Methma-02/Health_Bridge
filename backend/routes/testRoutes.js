// backend/routes/testRoutes.js
const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');
const Emergency = require('../models/Emergency');

// Get all hospitals (for testing)
router.get('/hospitals', async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json({
      success: true,
      data: hospitals
    });
  } catch (error) {
    console.error('Error fetching hospitals:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching hospitals',
      error: error.message
    });
  }
});

// Get all emergencies (for testing)
router.get('/emergencies', async (req, res) => {
  try {
    const emergencies = await Emergency.find().populate('acceptedBy');
    res.status(200).json({
      success: true,
      data: emergencies
    });
  } catch (error) {
    console.error('Error fetching emergencies:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching emergencies',
      error: error.message
    });
  }
});

// Simulate hospital response to emergency (for testing)
router.post('/simulate/hospital-response', async (req, res) => {
  try {
    const { emergencyId, hospitalId, response } = req.body;
    
    if (!emergencyId || !hospitalId || !response) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: emergencyId, hospitalId, and response'
      });
    }
    
    if (response !== 'accept' && response !== 'decline') {
      return res.status(400).json({
        success: false,
        message: 'Response must be either "accept" or "decline"'
      });
    }
    
    // If response is accept, use the existing acceptEmergency controller
    if (response === 'accept') {
      // Forward the request to acceptEmergency controller
      req.body = { emergencyId, hospitalId };
      return require('../controllers/emergencyController').acceptEmergency(req, res);
    } else {
      // Handle decline (you could implement a decline function if needed)
      const emergency = await Emergency.findById(emergencyId);
      if (!emergency) {
        return res.status(404).json({
          success: false,
          message: 'Emergency not found'
        });
      }
      
      // Update notification status for this hospital
      const hospitalIndex = emergency.notifiedHospitals.findIndex(
        h => h.hospitalId === hospitalId
      );
      
      if (hospitalIndex !== -1) {
        emergency.notifiedHospitals[hospitalIndex].response = 'declined';
        emergency.notifiedHospitals[hospitalIndex].responseTime = new Date();
        await emergency.save();
        
        // Emit socket event for real-time updates
        global.io.emit('hospitalDeclined', { 
          emergencyId: emergency._id,
          hospitalId: hospitalId
        });
        
        return res.status(200).json({
          success: true,
          message: 'Hospital declined emergency',
          data: emergency
        });
      } else {
        return res.status(404).json({
          success: false,
          message: 'Hospital not found in emergency notification list'
        });
      }
    }
  } catch (error) {
    console.error('Error simulating hospital response:', error);
    res.status(500).json({
      success: false,
      message: 'Error simulating hospital response',
      error: error.message
    });
  }
});

module.exports = router;