const express = require('express');
const router = express.Router();
const approvalStatusController = require('../controllers/approval_status.controller');

router.get('/', approvalStatusController.getAllApprovalStatus); 
router.get('/:id', approvalStatusController.getApprovalStatusById); 

router.post('/', approvalStatusController.createApprovalStatus);
router.put('/:id', approvalStatusController.updateApprovalStatus); 
router.delete('/:id', approvalStatusController.deleteApprovalStatus);

module.exports = router;