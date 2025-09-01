const express = require('express');
const router = express.Router();
const contractStatusController = require('../controllers/contract_status.controller');

router.get('/', contractStatusController.getAllContractStatus); 
router.get('/:id', contractStatusController.getContractStatusById); 

router.post('/', contractStatusController.createContractStatus);
router.put('/:id', contractStatusController.updateContractStatus); 
router.delete('/:id', contractStatusController.deleteContractStatus);

module.exports = router;