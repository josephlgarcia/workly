const express = require('express');
const router = express.Router();
const paysheetController = require('../controllers/paysheet.controller');

router.get('/', paysheetController.getAllPaysheets); 
router.get('/:id', paysheetController.getPaysheetById); 

router.post('/', paysheetController.createPaysheet);

module.exports = router;