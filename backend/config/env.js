const joi = require('joi');

const envSchema = joi.object({
  MONGODB_URI: joi.string().required(),
  JWT_SECRET: joi.string().min(32).required(),
  GOOGLE_CLIENT_ID: joi.string().required(),
  GOOGLE_CLIENT_SECRET: joi.string().required(),
  PORT: joi.number().default(3000),
  FRONTEND_URL: joi.string().uri().required(),
  NODE_ENV: joi.string().valid('development', 'production', 'test').default('development')
}).unknown();

function validateEnv() {
  const { error, value } = envSchema.validate(process.env);
  if (error) {
    throw new Error(`Environment validation failed: ${error.message}`);
  }
  return value;
}

module.exports = { validateEnv };