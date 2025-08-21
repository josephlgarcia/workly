const express = require('express');
const router = express.Router();
const cityController = require('../controllers/city.controller');

router.get('/', cityController.getAllCities); // Get all cities
router.get('/:id', cityController.getCityById); // Get city by ID

router.post('/', cityController.createCity); // Create a new city
router.put('/:id', cityController.updateCity); // Update city by ID
router.delete('/:id', cityController.deleteCity); // Delete city by ID

module.exports = router;