const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leave.controller');
const upload = require('../config/multer');

router.get('/employee/:id', leaveController.getLeavesByEmployeeId);
router.get('/', leaveController.getAllLeaves); 
router.get('/:id', leaveController.getLeaveById); 

router.post('/', upload.single('leave_file'), leaveController.createLeave);
router.put('/:id', leaveController.updateLeave); 
router.delete('/:id', leaveController.deleteLeave);

module.exports = router;