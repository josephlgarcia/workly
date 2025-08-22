const Position = require('../models/position.model');

const positionController = {
    getAllPositions: async (req, res) => {
        try {
            const positions = await Position.getAll();
            res.json(positions);
        } catch (error) {
            res.status(500).json({ message: 'Error to get all positions', error: error.message });
        }
    },

    getPositionById: async (req, res) => {
        try {
            const position = await Position.getById(req.params.id);
        if (!position) {
            return res.status(404).json({ message: 'Position not found' });
        }
        res.json(position);
        } catch (error) {
            res.status(500).json({ message: 'Error to get the position', error: error.message });
        }
    },

    createPosition: async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Position name is required field.' });
        }

        try {
            const newPositionId = await Position.create(req.body);
            res.status(201).json({ message: 'Position Created successful!', id: newPositionId });
        } catch (error) {
            res.status(500).json({ message: 'Error to create the position', error: error.message });
        }
    },

    updatePosition: async (req, res) => {
        try {
            const { id } = req.params;
            await Position.update(id, req.body);
            res.status(200).json({ message: 'Position Updated successful!'});
        } catch (error) {
            res.status(500).json({ message: 'Error to update the position', error: error.message });
        }
    },

    deletePosition: async (req, res) => {
        try {
            const { id } = req.params;
            await Position.delete(id);
            res.status(200).json({ message: 'Position Deleted successful!' });
        } catch (error) {
            res.status(500).json({ message: 'Error to delete the position', error: error.message });
        }
    }
};

module.exports = positionController;