// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { registerUser, loginUser, checkAuth } = require('../controllers/authcontroller');

router.post('/login', loginUser);

router.post('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  });
  res.json({ message: 'Logged out' });
});

router.get('/me', (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(200).json(null); // No user

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ email: decoded.email, role: decoded.role });
  } catch {
    res.status(403).json(null); // Invalid token
  }
});

router.post('/register', registerUser);

router.get("/check-auth", checkAuth);


module.exports = router;
