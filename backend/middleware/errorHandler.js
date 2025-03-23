const logger = require('../utils/logger');

function errorHandler(err, req, res, next) {
  logger.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Validation Error',
      details: Object.values(err.errors).map(e => e.message)
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      error: 'Duplicate Entry',
      field: Object.keys(err.keyPattern)[0]
    });
  }

  res.status(500).json({ error: 'Internal server error' });
}

module.exports = { errorHandler };
