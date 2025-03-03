// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
const { generateRegistrationId } = require('../utils/generators');
const { OAuth2Client } = require('google-auth-library');
const logger = require('../utils/logger');
const crypto = require('crypto');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class AuthController {
  static async register(req, res) {
    try {
      const { email, password, role, ...userData } = req.body;

      if (mongoose.connection.readyState !== 1) {
        await connectDB(); // Ensure DB is connected before querying
      }

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already registered' });
      }

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
      const user = await User.findOne({ email });

      if (!user) {
        // Return 200 even if user not found for security
        return res.json({ message: 'If the email exists, a reset link will be sent' });
      }

      // Generate reset token
      const resetToken = crypto.randomBytes(32).toString('hex');
      user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
      user.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

      await user.save();

      // Create reset URL
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Email content
    const message = `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset. Please click the link below to reset your password:</p>
      <a href="${resetUrl}" clicktracking="off">Reset Password</a>
      <p>This link is valid for 30 minutes only.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    try {
      // Create transporter
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      // Send email
      await transporter.sendMail({
        from: `"Your App Name" <${process.env.EMAIL_FROM}>`,
        to: user.email,
        subject: 'Password Reset Request',
        html: message,
      });

      res.json({
        message: 'Password reset instructions have been sent to your email',
      });
    } catch (emailError) {
      logger.error('Email sending error:', emailError);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      
      return res.status(500).json({ 
        error: 'Email could not be sent',
        details: process.env.NODE_ENV === 'development' ? emailError.message : undefined
      });
    }
  } catch (error) {
    logger.error('Forgot password error:', error);
    res.status(400).json({ error: error.message });
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
      user.password = password;
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