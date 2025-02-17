const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
const { generateRegistrationId } = require('../utils/generators');
const { OAuth2Client } = require('google-auth-library');
const logger = require('../utils/logger');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class AuthController {
  static async register(req, res) {
    try {
      const { email, password, role, ...userData } = req.body;

      // Generate registration ID
      const registrationId = generateRegistrationId(role);

      // Create user
      const user = new User({
        ...userData,
        email,
        password,
        role,
        registrationId
      });

      await user.save();

      // Create audit log
      await AuditLog.create({
        userId: user._id,
        action: 'USER_REGISTRATION',
        details: {
          email,
          role,
          registrationId
        },
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      });

      // Generate token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.status(201).json({
        token,
        user: {
          id: user._id,
          email: user.email,
          role: user.role,
          registrationId: user.registrationId,
          fullName: user.fullName
        }
      });
    } catch (error) {
      logger.error('Registration error:', error);
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Create audit log
      await AuditLog.create({
        userId: user._id,
        action: 'USER_LOGIN',
        details: { email },
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      });

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ token, user: {
        id: user._id,
        email: user.email,
        role: user.role,
        registrationId: user.registrationId,
        fullName: user.fullName
      }});
    } catch (error) {
      logger.error('Login error:', error);
      res.status(400).json({ error: error.message });
    }
  }

  static async googleLogin(req, res) {
    try {
      const { credential } = req.body;
      const ticket = await googleClient.verifyIdToken({
        idToken: credential,
        audience: process.env.GOOGLE_CLIENT_ID
      });

      const { email, name } = ticket.getPayload();
      let user = await User.findOne({ email });

      if (!user) {
        const registrationId = generateRegistrationId('user');
        user = new User({
          email,
          fullName: name,
          role: 'mother', // Default role for Google login
          registrationId,
          googleId: ticket.getUserId(),
          phone: 'Please update' // Placeholder
        });
        await user.save();
      }

      // Update last login
      user.lastLogin = new Date();
      await user.save();

      // Create audit log
      await AuditLog.create({
        userId: user._id,
        action: 'USER_LOGIN',
        details: { email, provider: 'google' },
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      });

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({ token, user: {
        id: user._id,
        email: user.email,
        role: user.role,
        registrationId: user.registrationId,
        fullName: user.fullName
      }});
    } catch (error) {
      logger.error('Google login error:', error);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;