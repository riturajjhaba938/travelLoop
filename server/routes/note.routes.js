const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

// Base: /api/notes
router.get('/:tripId', noteController.getNotes);
router.post('/:tripId', noteController.addNote);
router.put('/:id', noteController.updateNote);
router.delete('/:id', noteController.deleteNote);

module.exports = router;
