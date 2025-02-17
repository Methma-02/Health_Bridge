// middleware/auth.js
const jwt = require('jsonwebtoken');
const { getDB } = require('../config/database');
const logger = require('../utils/logger');

function verifyToken(token) {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}

async function findUser(id) {
  const db = getDB();
  return await db.collection('users').findOne(
    { _id: id },
    { projection: { password: 0 } }
  );
}

module.exports = {
  verifyToken,
  findUser
};