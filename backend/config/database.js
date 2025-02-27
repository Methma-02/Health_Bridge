// config/database.js
const mongoose = require('mongoose');
const logger = require('../utils/logger');

// Track connection status
let isConnected = false;

async function connectDB() {
  // If already connected, return existing connection
  if (isConnected) {
    logger.info('Using existing MongoDB connection');
    return mongoose.connection;
  }

  try {
    // Increase timeouts and add more robust connection options
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // Increased from 15000
      socketTimeoutMS: 60000, // Increased from 45000
      connectTimeoutMS: 60000, // Increased from 30000
      maxPoolSize: 10, // Add connection pooling
      retryWrites: true,
      w: 'majority',
      
    });
    
    // Set up connection event listeners
    mongoose.connection.on('connected', () => {
      isConnected = true;
      logger.info('MongoDB connection established');
    });
    
    mongoose.connection.on('error', (err) => {
      isConnected = false;
      logger.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      isConnected = false;
      logger.warn('MongoDB disconnected');
    });
    
    logger.info('Connected to MongoDB Atlas');
    isConnected = true;
    return mongoose.connection;
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    // Don't exit process, throw the error instead to handle it gracefully
    throw error;
  }
}

// Wait for database before proceeding function
async function waitForDB() {
  logger.info('Waiting for database connection...');
  if (!isConnected) {
    logger.info('Waiting for database connection...');
    await connectDB();
    // Small delay to ensure full connection
    await new Promise(resolve => setTimeout(resolve, 1000));
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
    isConnected = false;
  }
}

module.exports = { connectDB, getDB, closeDB, waitForDB };