const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Community feed is always public
router.get('/community', tripController.getPublicTrips);

// Single trip might be public or private
// Middleware handles the check, but we need optional auth or logic inside controller
router.get('/:id', (req, res, next) => {
  // If token exists, verify it, but don't block if it's missing (controller handles is_public)
  const token = req.header('Authorization')?.split(' ')[1];
  if (token) {
    return authMiddleware(req, res, next);
  }
  next();
}, tripController.getTripById);

// All other routes require auth
router.use(authMiddleware);

router.get('/', tripController.getAllTrips);
router.post('/', tripController.createTrip);
router.put('/:id', tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip);

module.exports = router;
