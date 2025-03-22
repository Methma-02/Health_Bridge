// backend/routes/emergencyRoutes.js
const express = require('express');
const router = express.Router();
const emergencyController = require('../controllers/emergencyController');

// Cancel emergency
router.post('/cancel/:emergencyId', emergencyController.cancelEmergency);

router.post('/complete/:emergencyId', emergencyController.completeEmergency);

router.get('/active', emergencyController.getActiveEmergencies); 

// Accept emergency (for hospitals)
router.post('/accept', emergencyController.acceptEmergency);

// Get emergency details by ID
router.get('/:emergencyId', emergencyController.getEmergency);

// Create new emergency alert
router.post('/', emergencyController.createEmergency);

module.exports = router;