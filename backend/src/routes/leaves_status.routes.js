const express = require('express');
const router = express.Router();
const leavesStatusController = require('../controllers/leaves_status.controller');

router.get('/', leavesStatusController.getAllLeavesStatus); 
router.get('/:id', leavesStatusController.getLeaveStatusById); 

router.post('/', leavesStatusController.createLeaveStatus);
router.put('/:id', leavesStatusController.updateLeaveStatus); 
router.delete('/:id', leavesStatusController.deleteLeaveStatus);

module.exports = router;