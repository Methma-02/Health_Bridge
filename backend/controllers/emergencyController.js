// backend/controllers/emergencyController.js
const Emergency = require('../models/Emergency');
const Hospital = require('../models/Hospital');
const googleMapsService = require('../services/googleMapsService');
const oneSignalService = require('../services/oneSignalService');

// Create a new emergency alert
const createEmergency = async (req, res) => {
  try {
    const { latitude, longitude, additionalInfo } = req.body;

    console.log('[SIMULATION] Creating emergency with data:', {
      latitude, longitude, additionalInfo
    });

    // Create new emergency without userId
    const emergency = new Emergency({
      location: {
        type: 'Point',
        coordinates: [longitude, latitude] // MongoDB uses [longitude, latitude]
      },
      additionalInfo,
      status: 'pending'
    });

    // Save to database
    await emergency.save();

    // Find nearby hospitals using our simulation service
    const nearbyHospitals = await googleMapsService.findNearbyHospitals(latitude, longitude);
    console.log(`[SIMULATION] Found ${nearbyHospitals.length} nearby hospitals`);
    
    // Store hospitals if they don't exist
    for (const hospitalData of nearbyHospitals) {
      await Hospital.findOneAndUpdate(
        { placeId: hospitalData.placeId },
        hospitalData,
        { upsert: true, new: true }
      );

      // Add to emergency's notified hospitals list
      emergency.notifiedHospitals.push({
        hospitalId: hospitalData.placeId,
        name: hospitalData.name,
        notifiedAt: new Date()
      });
    }

    await emergency.save();

    // Simulate sending notifications to all nearby hospitals
    await oneSignalService.sendEmergencyAlertToHospitals(emergency, nearbyHospitals);

    // Emit socket event for real-time updates
    if (global.io) {
      global.io.emit('newEmergency', { 
        emergencyId: emergency._id,
        hospitalCount: nearbyHospitals.length
      });
    }

    res.status(201).json({
      success: true,
      message: 'Emergency alert created successfully',
      data: emergency
    });
  } catch (error) {
    console.error('Error creating emergency:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating emergency alert',
      error: error.message
    });
  }
};

// Get emergency details
const getEmergency = async (req, res) => {
  try {
    const { emergencyId } = req.params;
    
    const emergency = await Emergency.findById(emergencyId)
      .populate('acceptedBy');
    
    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: 'Emergency not found'
      });
    }

    res.status(200).json({
      success: true,
      data: emergency
    });
  } catch (error) {
    console.error('Error fetching emergency:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching emergency details',
      error: error.message
    });
  }
};

// Handle hospital accepting emergency
const acceptEmergency = async (req, res) => {
  try {
    const { emergencyId, hospitalId } = req.body;
    
    console.log(`[SIMULATION] Hospital ${hospitalId} accepting emergency ${emergencyId}`);
    
    const emergency = await Emergency.findById(emergencyId);
    if (!emergency || emergency.status !== 'pending') {
      return res.status(400).json({
        success: false,
        message: 'Emergency not available or already accepted'
      });
    }

    const hospital = await Hospital.findOne({ placeId: hospitalId });
    if (!hospital) {
      return res.status(404).json({
        success: false,
        message: 'Hospital not found'
      });
    }

    // Update emergency status
    emergency.status = 'accepted';
    emergency.acceptedBy = hospital._id;
    
    // Update notification status for this hospital
    const hospitalIndex = emergency.notifiedHospitals.findIndex(
      h => h.hospitalId === hospitalId
    );
    
    if (hospitalIndex !== -1) {
      emergency.notifiedHospitals[hospitalIndex].response = 'accepted';
      emergency.notifiedHospitals[hospitalIndex].responseTime = new Date();
    }

    await emergency.save();

    // Get all notified hospitals to send cancellation to others
    const notifiedHospitalIds = emergency.notifiedHospitals.map(h => h.hospitalId);
    const allNotifiedHospitals = await Hospital.find({
      placeId: { $in: notifiedHospitalIds }
    });

    // Simulate notification to other hospitals that this hospital accepted
    await oneSignalService.sendNotificationToOtherHospitals(
      emergency, 
      hospital, 
      allNotifiedHospitals
    );

    // Simulate notification to mother that help is on the way
    await oneSignalService.sendAcceptNotificationToMother(
      emergency,
      hospital,
      emergency.userId.toString()
    );

    // Emit socket event for real-time updates
    if (global.io) {
      global.io.emit('emergencyAccepted', { 
        emergencyId: emergency._id,
        hospitalId: hospital._id,
        hospitalName: hospital.name
      });
    }

    res.status(200).json({
      success: true,
      message: 'Emergency accepted successfully',
      data: emergency
    });
  } catch (error) {
    console.error('Error accepting emergency:', error);
    res.status(500).json({
      success: false,
      message: 'Error accepting emergency',
      error: error.message
    });
  }
};

// Cancel an emergency
const cancelEmergency = async (req, res) => {
  try {
    const { emergencyId } = req.params;
    
    console.log(`[SIMULATION] Canceling emergency ${emergencyId}`);
    
    const emergency = await Emergency.findById(emergencyId);
    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: 'Emergency not found'
      });
    }

    // Can only cancel pending or accepted emergencies
    if (emergency.status === 'completed' || emergency.status === 'canceled') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel a completed or already canceled emergency'
      });
    }

    const previousStatus = emergency.status;
    emergency.status = 'canceled';
    await emergency.save();

    // Get all notified hospitals to send cancellation
    const notifiedHospitalIds = emergency.notifiedHospitals.map(h => h.hospitalId);
    const allNotifiedHospitals = await Hospital.find({
      placeId: { $in: notifiedHospitalIds }
    });

    // Simulate cancellation notification to hospitals
    await oneSignalService.sendCancellationToHospitals(emergency, allNotifiedHospitals);

    // Emit socket event for real-time updates
    if (global.io) {
      global.io.emit('emergencyCanceled', { emergencyId: emergency._id });
    }

    res.status(200).json({
      success: true,
      message: 'Emergency alert canceled successfully'
    });
  } catch (error) {
    console.error('Error canceling emergency:', error);
    res.status(500).json({
      success: false,
      message: 'Error canceling emergency alert',
      error: error.message
    });
  }
};

// Get active emergency for a user
const getActiveEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find({
      status: { $in: ['pending', 'accepted'] }
    }).populate('acceptedBy');
    
    res.status(200).json({
      success: true,
      data: emergencies
    });
  } catch (error) {
    console.error('Error fetching active emergencies:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching active emergencies',
      error: error.message
    });
  }
};
// Mark emergency as completed
const completeEmergency = async (req, res) => {
  try {
    const { emergencyId } = req.params;
    
    console.log(`[SIMULATION] Completing emergency ${emergencyId}`);
    
    const emergency = await Emergency.findById(emergencyId);
    if (!emergency) {
      return res.status(404).json({
        success: false,
        message: 'Emergency not found'
      });
    }

    // Can only complete accepted emergencies
    if (emergency.status !== 'accepted') {
      return res.status(400).json({
        success: false,
        message: 'Only accepted emergencies can be completed'
      });
    }

    emergency.status = 'completed';
    await emergency.save();

    // Emit socket event for real-time updates
    if (global.io) {
      global.io.emit('emergencyCompleted', { emergencyId: emergency._id });
    }

    res.status(200).json({
      success: true,
      message: 'Emergency marked as completed successfully'
    });
  } catch (error) {
    console.error('Error completing emergency:', error);
    res.status(500).json({
      success: false,
      message: 'Error completing emergency',
      error: error.message
    });
  }
};

module.exports = {
  createEmergency,
  getEmergency,
  acceptEmergency,
  cancelEmergency,
  getActiveEmergencies,
  completeEmergency
};