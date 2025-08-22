const express = require('express');
const router = express.Router();
const overtimeTypeController = require('../controllers/overtime_type.controller');

router.get('/', overtimeTypeController.getAllOvertimeTypes); 
router.get('/:id', overtimeTypeController.getOvertimeTypeById); 

router.post('/', overtimeTypeController.createOvertimeType);
router.put('/:id', overtimeTypeController.updateOvertimeType); 
router.delete('/:id', overtimeTypeController.deleteOvertimeType);

module.exports = router;