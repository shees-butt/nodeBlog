const jwt = require('jsonwebtoken');
const config = require('../../config.json');
const secretKey = config.jwtSecret;

const userAuthMiddleware = (req, res, next) => {
  // Extract the token from the request headers
  const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    if (decoded.role === 'user') {
      // User is authenticated as a user
      req.user = decoded;
      next();
    } else {
      return res.status(403).json({ error: 'Forbidden: User access only' });
    }
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized: Invalid token' });
  }
};

module.exports = userAuthMiddleware;
