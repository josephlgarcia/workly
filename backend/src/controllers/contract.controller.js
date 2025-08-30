const Contract = require('../models/contract.model');
const SalaryHistory = require('../models/salary_history.model');

const contractController = {
    getAllContracts: async (req, res) => {
        try {
            const contracts = await Contract.getAll();
            res.status(200).json(contracts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error to get contracts', error: error.message });
        }
    },

    getContractById: async (req, res) => {
        try {
            const contractId = req.params.id;
            const contract = await Contract.getById(contractId);
            if (!contract) {
                return res.status(404).json({ message: 'contract not found' });
            }
            res.status(200).json(contract);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error to get the contract', error: error.message });
        }
    },

    createContract: async (req, res) => {
        const { employee_id, contract_type_id, contract_status_id, start_date, end_date, salary } = req.body;
        
        if (!employee_id || !contract_type_id || !contract_status_id || !start_date || !salary) {
            return res.status(400).json({ message: 'Please provide all required fields.' });
        }

        try {
            const newContractId = await Contract.create(req.body);
            res.status(201).json({ message: 'Contract created successfully!', id_contract: newContractId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error creating contract', error: error.message });
        }
    },

    updateContract: async (req, res) => {
        try {
            const contractId = req.params.id;
            const { salary, reason, ...updatedData } = req.body;
            
            const existingContract = await Contract.getById(contractId);
            if (!existingContract) {
                return res.status(404).json({ message: 'Contract not found' });
            }

            const oldSalary = existingContract.salary;

            const updated = await Contract.update(contractId, req.body);
            if (!updated) {
                return res.status(404).json({ message: 'Contract not found' });
            }

            if (salary !== oldSalary) {
                await SalaryHistory.create(
                    contractId,
                    oldSalary,
                    salary,
                    new Date(), 
                    reason
                );
            }

            res.status(200).json({ message: 'Contract updated successfully!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error updating contract', error: error.message });
        }
    },

    deleteContract: async (req, res) => {
        try {
            const contractId = req.params.id;
            const deleted = await Contract.delete(contractId);
            if (!deleted) {
                return res.status(404).json({ message: 'Contract not found' });
            }
            res.status(200).json({ message: 'Contract successfully deleted!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error to delete the contract', error: error.message });
        }
    },
};

module.exports = contractController;
