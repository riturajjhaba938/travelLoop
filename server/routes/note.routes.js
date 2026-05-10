const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/:tripId/notes', noteController.getNotes);
router.post('/:tripId/notes', noteController.addNote);
router.delete('/notes/:id', noteController.deleteNote);

module.exports = router;
