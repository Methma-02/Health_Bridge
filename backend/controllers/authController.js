const jwt = require('jsonwebtoken');
const User = require('../models/User');
const AuditLog = require('../models/AuditLog');
const { generateRegistrationId } = require('../utils/generators');
const { OAuth2Client } = require('google-auth-library');
const logger = require('../utils/logger');
const crypto = require('crypto');
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt'); 

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

  static async sendOTP(req, res) {
    try {
      console.log("sendOTP called"); // Debugging log
      const { recipient_email, OTP } = req.body;
      console.log("Received OTP:", OTP); // Debugging log
      console.log("Recipient email:", recipient_email); // Debugging log
  
      // Check if user exists
      const user = await User.findOne({ email: recipient_email });
      if (!user) {
        console.log("User not found"); // Debugging log
        return res.status(404).json({ error: "User not found" });
      }
  
      // Save OTP to user
      user.resetPasswordOtp = OTP;
      user.resetPasswordOtpExpires = Date.now() + 300000; // 5 minutes
      await user.save();
      console.log("OTP saved to user"); // Debugging log
  
      // Send email with OTP
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false
        }
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: recipient_email,
        subject: "Password Recovery OTP",
        html: `<p>Your OTP for password recovery is: <strong>${OTP}</strong></p>`,
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Email sending error:", error);
          return res.status(500).json({ error: "Failed to send OTP email" });
        } else {
          console.log("Email sent:", info.response);
          return res.status(200).json({ message: "OTP sent successfully" });
        }
      });
  
      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error in sendOTP:", error); // Debugging log
      res.status(500).json({ error: error.message });
    }
  }
  
  static async resetPassword(req, res) {
    try {
      const { email, newPassword } = req.body;
  
      // Find user
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordOtp = null;
      user.resetPasswordOtpExpires = null;
      await user.save();
  
      res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  

}
module.exports = AuthController;