// backend/index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { setupSocket } = require('./socket/socketSetup');
const emergencyRoutes = require('./routes/emergencyRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI.replace('add_the collection name we are making for this feature for the collection', 'healthbridge_emergency'))
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/emergency', emergencyRoutes);

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.io
const io = setupSocket(server);

// Make io available to other modules
app.set('io', io);

// Start server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});