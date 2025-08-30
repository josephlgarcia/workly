const express = require('express');
const router = express.Router();
const contractController = require('../controllers/contract.controller');
const SalaryHistory = require('../models/salary_history.model');

router.get('/salary-history', async (req, res) => {
    try {
        const history = await SalaryHistory.getAll();
        res.status(200).json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el historial de salarios', error: error.message });
    }
});

router.get('/', contractController.getAllContracts); 
router.get('/:id', contractController.getContractById); 

router.post('/', contractController.createContract);
router.put('/:id', contractController.updateContract); 
router.delete('/:id', contractController.deleteContract);

module.exports = router;