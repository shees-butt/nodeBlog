const User = require('../model/authModel');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');
const secretKey = config.jwtSecret;

const isAdmin = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.isAdmin;
  } catch (error) {
    return false;
  }
};

const getAllUsers = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authorization.split('Bearer ')[1];

  if (!isAdmin(token)) {
    return res.status(403).json({ error: 'Unauthorized: Admin access required' });
  }

  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteUser = async (req, res) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Missing or invalid token' });
  }

  const token = authorization.split('Bearer ')[1];

  if (!isAdmin(token)) {
    return res.status(403).json({ error: 'Unauthorized: Admin access required' });
  }

  const userId = req.params.id;

  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllUsers,
  deleteUser,
};