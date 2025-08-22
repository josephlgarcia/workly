const OvertimeType = require('../models/overtime_type.model');

const overtimeTypeController = {
    getAllOvertimeTypes: async (req, res) => {
        try {
            const overtimeTypes = await OvertimeType.getAll();
            res.json(overtimeTypes);
        } catch (error) {
            res.status(500).json({ message: 'Error to get all overtimeTypes', error: error.message });
        }
    },

    getOvertimeTypeById: async (req, res) => {
        try {
            const overtimeType = await OvertimeType.getById(req.params.id);
        if (!overtimeType) {
            return res.status(404).json({ message: 'OvertimeType not found' });
        }
        res.json(overtimeType);
        } catch (error) {
            res.status(500).json({ message: 'Error to get the overtimeType', error: error.message });
        }
    },

    createOvertimeType: async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'OvertimeType name is required field.' });
        }

        try {
            const newOvertimeTypeId = await OvertimeType.create(req.body);
            res.status(201).json({ message: 'OvertimeType Created successful!', id: newOvertimeTypeId });
        } catch (error) {
            res.status(500).json({ message: 'Error to create the overtimeType', error: error.message });
        }
    },

    updateOvertimeType: async (req, res) => {
        try {
            const { id } = req.params;
            await OvertimeType.update(id, req.body);
            res.status(200).json({ message: 'OvertimeType Updated successful!'});
        } catch (error) {
            res.status(500).json({ message: 'Error to update the overtimeType', error: error.message });
        }
    },

    deleteOvertimeType: async (req, res) => {
        try {
            const { id } = req.params;
            await OvertimeType.delete(id);
            res.status(200).json({ message: 'OvertimeType Deleted successful!' });
        } catch (error) {
            res.status(500).json({ message: 'Error to delete the overtimeType', error: error.message });
        }
    }
};

module.exports = overtimeTypeController;