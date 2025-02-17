/**const http = require("http");

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });

  if (req.url === "/" && req.method === "GET") {
    res.end(JSON.stringify({ message: "Backend is running!" }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});/** */

// server.js
require('dotenv').config();
const http = require('http');
const { parse: parseUrl } = require('url');
const { connectDB } = require('./config/database');
const logger = require('./utils/logger');

// Parse JSON body from request
async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

// Rate limiting implementation
const rateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  clients: new Map(),
  
  checkLimit(ip) {
    const now = Date.now();
    const windowStart = now - this.windowMs;
    
    if (!this.clients.has(ip)) {
      this.clients.set(ip, []);
    }
    
    const requests = this.clients.get(ip);
    const recentRequests = requests.filter(time => time > windowStart);
    this.clients.set(ip, recentRequests);
    
    if (recentRequests.length >= this.max) {
      return false;
    }
    
    recentRequests.push(now);
    return true;
  }
};

// Authentication middleware
async function authenticateToken(req) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return { error: 'Access token required', status: 401 };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const db = getDB();
    
    const user = await db.collection('users').findOne(
      { _id: decoded.id },
      { projection: { password: 0 } }
    );

    if (!user) {
      return { error: 'User not found', status: 401 };
    }

    return { user };
  } catch (error) {
    logger.error('Authentication error:', error);
    return { error: 'Invalid token', status: 401 };
  }
}

// Role access check
function checkRoleAccess(user, allowedRoles) {
  return user && allowedRoles.includes(user.role);
}

// Route handlers
const routes = {
  '/api/register': {
    POST: async (req, res) => {
      try {
        const body = await parseBody(req);
        const result = await register(body, req.socket.remoteAddress);
        res.writeHead(201, { 'Content-Type': 'application/json', ...corsHeaders });
        res.end(JSON.stringify(result));
      } catch (error) {
        logger.error('Registration error:', error);
        res.writeHead(500, { 'Content-Type': 'application/json', ...corsHeaders });
        res.end(JSON.stringify({ error: 'Registration failed' }));
      }
    }
  },
  
  '/api/google-login': {
    POST: async (req, res) => {
      try {
        const body = await parseBody(req);
        const result = await handleGoogleAuth(body);
        res.writeHead(200, { 'Content-Type': 'application/json', ...corsHeaders });
        res.end(JSON.stringify(result));
      } catch (error) {
        logger.error('Google auth error:', error);
        res.writeHead(401, { 'Content-Type': 'application/json', ...corsHeaders });
        res.end(JSON.stringify({ error: 'Google authentication failed' }));
      }
    }
  },

  '/api/user/profile': {
    GET: async (req, res) => {
      const authResult = await authenticateToken(req);
      if (authResult.error) {
        res.writeHead(authResult.status, { 'Content-Type': 'application/json', ...corsHeaders });
        res.end(JSON.stringify({ error: authResult.error }));
        return;
      }
      
      res.writeHead(200, { 'Content-Type': 'application/json', ...corsHeaders });
      res.end(JSON.stringify({ user: authResult.user }));
    }
  },

  '/api/admin/users': {
    GET: async (req, res) => {
      const authResult = await authenticateToken(req);
      if (authResult.error) {
        res.writeHead(authResult.status, { 'Content-Type': 'application/json', ...corsHeaders });
        res.end(JSON.stringify({ error: authResult.error }));
        return;
      }

      if (!checkRoleAccess(authResult.user, ['admin'])) {
        res.writeHead(403, { 'Content-Type': 'application/json', ...corsHeaders });
        res.end(JSON.stringify({ error: 'Access denied' }));
        return;
      }

      // Handle admin-only route logic here
    }
  }
};

// Create and start server
const server = http.createServer(async (req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  // Check rate limit
  const clientIp = req.socket.remoteAddress;
  if (!rateLimit.checkLimit(clientIp)) {
    res.writeHead(429, { 'Content-Type': 'application/json', ...corsHeaders });
    res.end(JSON.stringify({ error: 'Too many requests' }));
    return;
  }

  const { pathname } = parseUrl(req.url);
  const route = routes[pathname];

  if (route && route[req.method]) {
    await route[req.method](req, res);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json', ...corsHeaders });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectDB();
    server.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();