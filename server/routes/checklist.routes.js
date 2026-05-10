const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/checklist.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

// Base: /api/checklist
router.get('/:tripId', checklistController.getChecklist);
router.post('/:tripId', checklistController.addItem);
router.put('/item/:id', checklistController.updateItem);
router.delete('/item/:id', checklistController.deleteItem);

module.exports = router;
