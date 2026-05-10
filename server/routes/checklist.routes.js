const express = require('express');
const router = express.Router();
const checklistController = require('../controllers/checklist.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/:tripId/checklist', checklistController.getChecklist);
router.post('/:tripId/checklist', checklistController.addItem);
router.put('/checklist/:id', checklistController.updateItem);
router.delete('/checklist/:id', checklistController.deleteItem);

module.exports = router;
