const express = require('express');
const router = express.Router();
const tripController = require('../controllers/trip.controller');
const authMiddleware = require('../middleware/auth.middleware');
const optionalAuth = require('../middleware/optionalAuth.middleware');

// Community feed is always public
router.get('/community', tripController.getPublicTrips);

// Single trip public read via optional auth
router.get('/:id', optionalAuth, tripController.getTripById);

// All other routes require mandatory auth
router.use(authMiddleware);

router.get('/', tripController.getAllTrips);
router.post('/', tripController.createTrip);
router.put('/:id', tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip);

module.exports = router;
