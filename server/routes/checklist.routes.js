const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/checklist.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

// Base: /api/checklist
// Specific routes first to avoid ambiguity
router.put('/item/:id', checklistController.updateItem);
router.delete('/item/:id', checklistController.deleteItem);

// Trip-based routes
router.get('/trip/:tripId', checklistController.getChecklist);
router.post('/trip/:tripId', checklistController.addItem);

module.exports = router;
