// routes/monitor.js
const express = require('express');
const router = express.Router();
const { getDB } = require('../config/database');

router.get('/status', async (req, res) => {
  try {
    const db = getDB();
    const dbStatus = await db.stats();
    
    const status = {
      database: {
        status: 'connected',
        collections: dbStatus.collections,
        documents: dbStatus.objects
      },
      server: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        timestamp: new Date()
      }
    };
    
    res.json(status);
  } catch (error) {
    res.status(500).json({
      database: { status: 'disconnected' },
      error: error.message
    });
  }
});

module.exports = router;