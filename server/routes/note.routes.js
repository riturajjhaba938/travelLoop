const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

// Base: /api/notes
router.get('/trip/:tripId', noteController.getNotes);
router.post('/trip/:tripId', noteController.addNote);
router.put('/item/:id', noteController.updateNote);
router.delete('/item/:id', noteController.deleteNote);

module.exports = router;
