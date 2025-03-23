// routes/users.js
const router = require('express').Router();
const User = require('../models/User');
const { authenticate, authorize } = require('../middleware/auth');
const AuditLog = require('../models/AuditLog');
const logger = require('../utils/logger');

// Get all users (admin only)
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const users = await User.find({}, '-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    logger.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get user profile
router.get('/profile', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.user._id, '-password');
    res.json(user);
  } catch (error) {
    logger.error('Error fetching profile:', error);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/profile', authenticate, async (req, res) => {
  try {
    const allowedUpdates = ['fullName', 'phone', 'mohDivision', 'workPlace'];
    const updates = Object.keys(req.body)
      .filter(key => allowedUpdates.includes(key))
      .reduce((obj, key) => {
        obj[key] = req.body[key];
        return obj;
      }, {});

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $set: updates },
      { new: true, runValidators: true }
    ).select('-password');

    await AuditLog.create({
      userId: user._id,
      action: 'PROFILE_UPDATE',
      details: updates,
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    res.json(user);
  } catch (error) {
    logger.error('Error updating profile:', error);
    res.status(400).json({ error: error.message });
  }
});

// Deactivate user (admin only)
router.put('/:id/deactivate', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { isActive: false } },
      { new: true }
    ).select('-password');

    await AuditLog.create({
      userId: req.user._id,
      action: 'USER_DEACTIVATION',
      details: { deactivatedUserId: user._id },
      ipAddress: req.ip,
      userAgent: req.get('user-agent')
    });

    res.json(user);
  } catch (error) {
    logger.error('Error deactivating user:', error);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
