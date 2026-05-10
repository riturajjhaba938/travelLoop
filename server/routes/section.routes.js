const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/section.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

// Base: /api/sections
router.get('/trip/:tripId', sectionController.getSections);
router.post('/trip/:tripId', sectionController.addSection);
router.put('/:id', sectionController.updateSection);
router.delete('/:id', sectionController.deleteSection);

module.exports = router;
