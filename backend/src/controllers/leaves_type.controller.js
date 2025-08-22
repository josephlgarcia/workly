const LeavesType = require('../models/leaves_type.model');

const leavesTypeController = {
    getAllLeavesTypes: async (req, res) => {
        try {
            const leavesTypes = await LeavesType.getAll();
            res.json(leavesTypes);
        } catch (error) {
            res.status(500).json({ message: 'Error to get all leavesTypes', error: error.message });
        }
    },

    getLeavesTypeById: async (req, res) => {
        try {
            const leavesType = await LeavesType.getById(req.params.id);
        if (!leavesType) {
            return res.status(404).json({ message: 'LeavesType not found' });
        }
        res.json(leavesType);
        } catch (error) {
            res.status(500).json({ message: 'Error to get the leavesType', error: error.message });
        }
    },

    createLeavesType: async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'LeavesType name and is required field.' });
        }

        try {
            const newLeavesTypeId = await LeavesType.create(req.body);
            res.status(201).json({ message: 'LeavesType Created successful!', id: newLeavesTypeId });
        } catch (error) {
            res.status(500).json({ message: 'Error to create the leavesType', error: error.message });
        }
    },

    updateLeavesType: async (req, res) => {
        try {
            const { id } = req.params;
            await LeavesType.update(id, req.body);
            res.status(200).json({ message: 'LeavesType Updated successful!'});
        } catch (error) {
            res.status(500).json({ message: 'Error to update the leavesType', error: error.message });
        }
    },

    deleteLeavesType: async (req, res) => {
        try {
            const { id } = req.params;
            await LeavesType.delete(id);
            res.status(200).json({ message: 'LeavesType Deleted successful!' });
        } catch (error) {
            res.status(500).json({ message: 'Error to delete the leavesType', error: error.message });
        }
    }
};

module.exports = leavesTypeController;