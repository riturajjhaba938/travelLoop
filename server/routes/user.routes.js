const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller'); // Linked to auth's getMe
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/me', authController.getMe);
router.put('/me', userController.updateProfile);

module.exports = router;
