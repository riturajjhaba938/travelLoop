const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware); // Add admin check here later

router.get('/stats', adminController.getStats);
router.get('/users', adminController.getAllUsers);

module.exports = router;
