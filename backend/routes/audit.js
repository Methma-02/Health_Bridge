// routes/audit.js
const router = require('express').Router();
const AuditLog = require('../models/AuditLog');
const { authenticate, authorize } = require('../middleware/auth');
const logger = require('../utils/logger');

// Get all audit logs (admin only)
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
  try {
    const { page = 1, limit = 50, action, userId, startDate, endDate } = req.query;
    
    const query = {};
    if (action) query.action = action;
    if (userId) query.userId = userId;
    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    const [logs, total] = await Promise.all([
      AuditLog.find(query)
        .sort({ timestamp: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit))
        .populate('userId', 'fullName email role'),
      AuditLog.countDocuments(query)
    ]);

    res.json({
      logs,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    logger.error('Error fetching audit logs:', error);
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

// Get user's own audit logs
router.get('/me', authenticate, async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    
    const [logs, total] = await Promise.all([
      AuditLog.find({ userId: req.user._id })
        .sort({ timestamp: -1 })
        .skip((page - 1) * limit)
        .limit(parseInt(limit)),
      AuditLog.countDocuments({ userId: req.user._id })
    ]);

    res.json({
      logs,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    logger.error('Error fetching user audit logs:', error);
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

module.exports = router;