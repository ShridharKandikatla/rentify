const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

const generateToken = (userId, role) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '1h' });
};

module.exports = { generateToken };
