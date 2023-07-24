const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models/User'); // Import the User model

// Set token secret and expiration date
const secret = 'mysecretsshhhhh';
const expiration = '2h';

// Middleware for authenticated routes
const authMiddleware = async (req, res, next) => {
  try {
    // Allows the token to be sent via req.query or headers
    let token = req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }

    if (!token) {
      return res.status(400).json({ message: 'You have no token!' });
    }

    // Verify the token and get user data from it
    const { data } = jwt.verify(token, secret, { maxAge: expiration });
    req.user = data;

    next();
  } catch (error) {
    console.log('Invalid token');
    return res.status(400).json({ message: 'Invalid token!' });
  }
};

const signToken = ({ username, email, _id }) => {
  const payload = { username, email, _id };

  return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
};

module.exports = { authMiddleware, signToken };
