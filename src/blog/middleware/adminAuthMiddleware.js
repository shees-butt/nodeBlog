const jwt = require('jsonwebtoken');
const config = require('../../config.json');
const secretKey = config.jwtSecret;

const adminAuthMiddleware = (req, res, next) => {
  // Extract the token from the request headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded.role === 'admin') {
      // User is authenticated as an admin
      req.admin = decoded;
      next();
    } else {
      return res.status(403).json({ error: 'Forbidden: Admin access only' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = adminAuthMiddleware;
