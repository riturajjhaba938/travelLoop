const express = require('express');
const router = express.Router();
const sectionController = require('../controllers/section.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/:tripId/sections', sectionController.getSections);
router.post('/:tripId/sections', sectionController.addSection);
router.put('/sections/:id', sectionController.updateSection);
router.delete('/sections/:id', sectionController.deleteSection);

module.exports = router;
