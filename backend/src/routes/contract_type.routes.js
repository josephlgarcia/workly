const express = require('express');
const router = express.Router();
const contractTypeController = require('../controllers/contract_type.controller');

router.get('/', contractTypeController.getAllContractTypes); 
router.get('/:id', contractTypeController.getContractTypeById); 

router.post('/', contractTypeController.createContractType);
router.put('/:id', contractTypeController.updateContractType); 
router.delete('/:id', contractTypeController.deleteContractType);

module.exports = router;