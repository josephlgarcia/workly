const express = require('express');
const router = express.Router();
const departamentController = require('../controllers/departament.controller');

router.get('/', departamentController.getAllDepartaments); 
router.get('/:id', departamentController.getDepartamentById); 

router.post('/', departamentController.createDepartament);
router.put('/:id', departamentController.updateDepartament); 
router.delete('/:id', departamentController.deleteDepartament);

module.exports = router;