const ContractStatus = require('../models/contract_status.model');

const contractStatusController = {
    getAllContractStatus: async (req, res) => {
        try {
            const contractStatus = await ContractStatus.getAll();
            res.json(contractStatus);
        } catch (error) {
            res.status(500).json({ message: 'Error to get all contract status', error: error.message });
        }
    },

    getContractStatusById: async (req, res) => {
        try {
            const ContractStatus = await ContractStatus.getById(req.params.id);
        if (!ContractStatus) {
            return res.status(404).json({ message: 'Contract status not found' });
        }
        res.json(ContractStatus);
        } catch (error) {
            res.status(500).json({ message: 'Error to get the contract status', error: error.message });
        }
    },

    createContractStatus: async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Contract status name is required field.' });
        }

        try {
            const newContractStatusId = await ContractStatus.create(req.body);
            res.status(201).json({ message: 'Contract status Created successful!', id: newContractStatusId });
        } catch (error) {
            res.status(500).json({ message: 'Error to create the contract status', error: error.message });
        }
    },

    updateContractStatus: async (req, res) => {
        try {
            const { id } = req.params;
            await ContractStatus.update(id, req.body);
            res.status(200).json({ message: 'Contract status Updated successful!'});
        } catch (error) {
            res.status(500).json({ message: 'Error to update the contract status', error: error.message });
        }
    },

    deleteContractStatus: async (req, res) => {
        try {
            const { id } = req.params;
            await ContractStatus.delete(id);
            res.status(200).json({ message: 'Contract status Deleted successful!' });
        } catch (error) {
            res.status(500).json({ message: 'Error to delete the contract status', error: error.message });
        }
    }
};

module.exports = contractStatusController;