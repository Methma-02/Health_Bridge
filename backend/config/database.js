// config/database.js
const { MongoClient } = require('mongodb');
const logger = require('../utils/logger');

let client = null;
let db = null;

async function connectDB() {
  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    db = client.db('healthbridge');
    
    // Create indexes for better performance
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ registrationId: 1 }, { unique: true });
    await db.collection('audit_logs').createIndex({ timestamp: 1 });
    await db.collection('audit_logs').createIndex({ userId: 1 });
    
    logger.info('Connected to MongoDB Atlas');
    return db;
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

function getDB() {
  if (!db) {
    throw new Error('Database not initialized');
  }
  return db;
}

async function closeDB() {
  if (client) {
    await client.close();
    client = null;
    db = null;
  }
}

module.exports = { connectDB, getDB, closeDB };