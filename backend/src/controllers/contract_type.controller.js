const ContractType = require('../models/contract_type.model');

const contractTypeController = {
    getAllContractTypes: async (req, res) => {
        try {
            const contractTypes = await ContractType.getAll();
            res.json(contractTypes);
        } catch (error) {
            res.status(500).json({ message: 'Error to get all contract types', error: error.message });
        }
    },

    getContractTypeById: async (req, res) => {
        try {
            const contractType = await ContractType.getById(req.params.id);
        if (!contractType) {
            return res.status(404).json({ message: 'Contract type not found' });
        }
        res.json(contractType);
        } catch (error) {
            res.status(500).json({ message: 'Error to get the contract type', error: error.message });
        }
    },

    createContractType: async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Contract type name is required field.' });
        }

        try {
            const newContractTypeId = await ContractType.create(req.body);
            res.status(201).json({ message: 'Contract type Created successful!', id: newContractTypeId });
        } catch (error) {
            res.status(500).json({ message: 'Error to create the contract type', error: error.message });
        }
    },

    updateContractType: async (req, res) => {
        try {
            const { id } = req.params;
            await ContractType.update(id, req.body);
            res.status(200).json({ message: 'Contract type Updated successful!'});
        } catch (error) {
            res.status(500).json({ message: 'Error to update the contract type', error: error.message });
        }
    },

    deleteContractType: async (req, res) => {
        try {
            const { id } = req.params;
            await ContractType.delete(id);
            res.status(200).json({ message: 'Contract type Deleted successful!' });
        } catch (error) {
            res.status(500).json({ message: 'Error to delete the contract type', error: error.message });
        }
    }
};

module.exports = contractTypeController;