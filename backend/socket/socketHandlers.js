// backend/socket/socketHandlers.js
const { Server } = require('socket.io');
let io;

const setupSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    // Join a room for specific emergency updates
    socket.on('joinEmergencyRoom', (emergencyId) => {
      socket.join(`emergency-${emergencyId}`);
      console.log(`Client ${socket.id} joined room emergency-${emergencyId}`);
    });

    // Handle hospital sending updates (like ETA)
    socket.on('updateEmergencyStatus', (data) => {
      io.to(`emergency-${data.emergencyId}`).emit('emergencyStatusUpdate', data);
    });

    // Handle chat messages
    socket.on('sendMessage', (data) => {
      io.to(`emergency-${data.emergencyId}`).emit('newMessage', {
        sender: data.sender,
        message: data.message,
        timestamp: new Date()
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });

  return io;
};

module.exports = {
  setupSocket,
  getIo: () => io
};