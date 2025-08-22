const express = require('express');
const router = express.Router();
const leavesTypeController = require('../controllers/leaves_type.controller');

router.get('/', leavesTypeController.getAllLeavesTypes); 
router.get('/:id', leavesTypeController.getLeavesTypeById); 

router.post('/', leavesTypeController.createLeavesType);
router.put('/:id', leavesTypeController.updateLeavesType); 
router.delete('/:id', leavesTypeController.deleteLeavesType);

module.exports = router;