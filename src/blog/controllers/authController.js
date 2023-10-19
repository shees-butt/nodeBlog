const User = require('../model/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');
const secretKey = config.jwtSecret;

const signup = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body; // Include isAdmin in the request body

    // Check if the user with the same email already exists
    const user = await User.findOne({ where: { email } });

    if (user) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password for security
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create a new user in the database
    const newUser = await User.create({ username, email, password: hashedPassword, isAdmin });

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user with the provided email exists
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      // Passwords match - generate and return a JWT token with user's ID and isAdmin status
      const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, secretKey, { expiresIn: '1h' });

      let message = 'Login successful';
      if (user.isAdmin) {
        message = 'Login successful as admin';
      } else {
        message = 'Login successful as user';
      }

      res.status(200).json({ message, token });
    } else {
      // Passwords don't match
      res.status(401).json({ error: 'Incorrect password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


module.exports = {
  signup,
  login,
};
