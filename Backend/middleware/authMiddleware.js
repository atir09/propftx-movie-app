// Importing NPM Packages
const jwt = require('jsonwebtoken');

// Importing User Model form "models" folder
const {User} = require('../models/User');
const JWT_SECRET=process.env.JWT_SECRET

// Aunthentication Function
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).send({ message: 'Authentication required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    } else {
      req.user = decodedToken;
      next();
    }
  });
};

module.exports = {authenticateUser};