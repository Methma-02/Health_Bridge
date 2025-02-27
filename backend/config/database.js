// config/database.js
const mongoose = require('mongoose');
const logger = require('../utils/logger');

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 30000,
    });
    
    logger.info('Connected to MongoDB Atlas');
    return mongoose.connection;
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

function getDB() {
  if (!mongoose.connection || mongoose.connection.readyState !== 1) {
    throw new Error('Database not initialized');
  }
  return mongoose.connection;
}

async function closeDB() {
  if (mongoose.connection) {
    await mongoose.connection.close();
  }
}

module.exports = { connectDB, getDB, closeDB };