// controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getDB } = require('../config/database');
const { generateRegistrationId } = require('../utils/generators');
const logger = require('../utils/logger');
const { OAuth2Client } = require('google-auth-library');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function register(userData, ipAddress) {
  const db = getDB();
  const { email, password, role, ...otherData } = userData;

  // Check if email exists
  const existingUser = await db.collection('users').findOne({ email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  // Generate registration ID
  const registrationId = generateRegistrationId(role);

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = {
    ...otherData,
    email,
    password: hashedPassword,
    role,
    registrationId,
    createdAt: new Date(),
    lastLogin: null,
    isActive: true
  };

  const result = await db.collection('users').insertOne(user);

  // Create audit log
  await db.collection('audit_logs').insertOne({
    userId: result.insertedId,
    action: 'USER_REGISTRATION',
    details: {
      email,
      role,
      registrationId,
      ipAddress
    },
    timestamp: new Date()
  });

  // Generate token
  const token = jwt.sign(
    { id: result.insertedId, email, role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return {
    token,
    user: {
      id: result.insertedId,
      email,
      role,
      registrationId,
      ...otherData
    }
  };
}

async function handleGoogleAuth(authData) {
  const { credential } = authData;
  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  
  const { email, name } = ticket.getPayload();
  const db = getDB();

  let user = await db.collection('users').findOne({ email });

  if (!user) {
    const registrationId = generateRegistrationId('user');
    user = {
      email,
      fullName: name,
      role: 'user',
      registrationId,
      createdAt: new Date(),
      lastLogin: new Date(),
      isActive: true,
      googleId: ticket.getUserId()
    };

    const result = await db.collection('users').insertOne(user);
    user._id = result.insertedId;
  }

  const token = jwt.sign(
    { id: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  return { token, user: { ...user, password: undefined } };
}

module.exports = { register, handleGoogleAuth };