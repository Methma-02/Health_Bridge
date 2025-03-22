// backend/routes/emergencyRoutes.js
const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

// Create new emergency alert
router.post('/', emergencyController.createEmergency);

// Get emergency details by ID
router.get('/:emergencyId', emergencyController.getEmergency);

// Accept emergency (for hospitals)
router.post('/accept', emergencyController.acceptEmergency);

// Cancel emergency
router.post('/cancel/:emergencyId', emergencyController.cancelEmergency);

// Get active emergency for a user
router.get('/user/:userId', emergencyController.getUserActiveEmergency);

router.post('/complete/:emergencyId', emergencyController.completeEmergency);

module.exports = router;