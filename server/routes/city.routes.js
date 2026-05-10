const express = require('express');
const router = express.Router();
const cityController = require('../controllers/city.controller');

router.get('/', cityController.getAllCities);
router.get('/activities', cityController.getActivities);

module.exports = router;
