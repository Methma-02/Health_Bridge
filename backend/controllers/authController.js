const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
const { generateRegistrationId } = require('../utils/generators');
const { OAuth2Client } = require('google-auth-library');
const logger = require('../utils/logger');
const crypto = require('crypto');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt'); // Add this for password hashing

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class AuthController {
  static async register(req, res) {
    try {
      const { email, password, role, ...userData } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

      // Generate registration ID
      const registrationId = generateRegistrationId(role);
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = new User({
        ...userData,
        email,
        password:hashedPassword,
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

      if (!user.isActive) {
        return res.status(401).json({ error: 'Account is deactivated' });
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

      res.json({
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
        const registrationId = generateRegistrationId('mother');
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

      if (!user.isActive) {
        return res.status(401).json({ error: 'Account is deactivated' });
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

      res.json({
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
      logger.error('Google login error:', error);
      res.status(400).json({ error: error.message });
    }
  }

  static async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
      
      const user = await User.findOne({ email });
    
      if (!user) {
        return res.status(404).json({ error: 'Email not found' });
      }
    
      res.json({ exists: true });
    } catch (error) {
      logger.error('Forgot password error:', error);
      res.status(400).json({ error: error.message });
    }
  }
  
  static async resetPassword(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      // Validate password
      if (password.length < 8) {
        return res.status(400).json({ error: 'Password must be at least 8 characters long' });
      }
      
      // Check for uppercase letter
      if (!/[A-Z]/.test(password)) {
        return res.status(400).json({ error: 'Password must contain at least one uppercase letter' });
      }
      
      // Check for lowercase letter
      if (!/[a-z]/.test(password)) {
        return res.status(400).json({ error: 'Password must contain at least one lowercase letter' });
      }
      
      // Check for number
      if (!/[0-9]/.test(password)) {
        return res.status(400).json({ error: 'Password must contain at least one number' });
      }
      
      // Check for special character
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        return res.status(400).json({ error: 'Password must contain at least one special character' });
      }
      
      // Hash the password and update user
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      
      // Clear any reset tokens if they exist
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      
      await user.save();
      
      // Create audit log
      await AuditLog.create({
        userId: user._id,
        action: 'PASSWORD_RESET_COMPLETE',
        details: { email: user.email },
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      });
      
      res.json({ message: 'Password reset successful' });
    } catch (error) {
      logger.error('Reset password error:', error);
      res.status(400).json({ error: error.message });
    }
  }
  static async verifyResetToken(req, res) {
    try {
      const { token } = req.params;
      
      // Get hashed token
      const resetPasswordToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');
  
      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
      });
  
      if (!user) {
        return res.status(400).json({ valid: false, message: 'Invalid or expired reset token' });
      }
  
      res.json({ valid: true });
    } catch (error) {
      logger.error('Verify reset token error:', error);
      res.status(400).json({ valid: false, error: error.message });
    }
  }

  static async resetPassword(req, res) {
    try {
      const { token, password } = req.body;

      // Get hashed token
      const resetPasswordToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

      const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
      });

      if (!user) {
        return res.status(400).json({ error: 'Invalid or expired reset token' });
      }

      // Set new password
      user.password = await bcrypt.hash(password, 10); // Hash the password
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      // Create audit log
      await AuditLog.create({
        userId: user._id,
        action: 'PASSWORD_RESET_COMPLETE',
        details: { email: user.email },
        ipAddress: req.ip,
        userAgent: req.get('user-agent')
      });

      res.json({ message: 'Password reset successful' });
    } catch (error) {
      logger.error('Reset password error:', error);
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;