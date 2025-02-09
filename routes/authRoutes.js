const router = require('express').Router();
const passport = require('passport');
const { generateJWT } = require('../utils/jwtUtils');

// Initiate Google OAuth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Handle Google callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    session: false,
    failureRedirect: '/api/auth/google/failure',
  }),
  (req, res) => {
    // Successful authentication
    const token = generateJWT(req.user);

    res.json({ token });
  }
);

router.get('/google/failure', (req, res) => {
  res.status(401).json({ message: 'Google authentication failed' });
});

module.exports = router;
