const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const { generateToken } = require('../utils/jwtUtil');

const prisma = new PrismaClient();

const register = async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;
  if (!firstName || !lastName || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      },
    });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: 'User already exists' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user.id, user.role);
    res.json({ token });
  } else {
    res.status(400).json({ error: 'Invalid email or password' });
  }
};

module.exports = { register, login };
