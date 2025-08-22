const Departament = require('../models/departament.model');

const departamentController = {
    getAllDepartaments: async (req, res) => {
        try {
            const departaments = await Departament.getAll();
            res.json(departaments);
        } catch (error) {
            res.status(500).json({ message: 'Error to get all departaments', error: error.message });
        }
    },

    getDepartamentById: async (req, res) => {
        try {
            const departament = await Departament.getById(req.params.id);
        if (!departament) {
            return res.status(404).json({ message: 'Departament not found' });
        }
        res.json(departament);
        } catch (error) {
            res.status(500).json({ message: 'Error to get the departament', error: error.message });
        }
    },

    createDepartament: async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Departament name is required field.' });
        }

        try {
            const newDepartamentId = await Departament.create(req.body);
            res.status(201).json({ message: 'Departament Created successful!', id: newDepartamentId });
        } catch (error) {
            res.status(500).json({ message: 'Error to create the departament', error: error.message });
        }
    },

    updateDepartament: async (req, res) => {
        try {
            const { id } = req.params;
            await Departament.update(id, req.body);
            res.status(200).json({ message: 'Departament Updated successful!'});
        } catch (error) {
            res.status(500).json({ message: 'Error to update the departament', error: error.message });
        }
    },

    deleteDepartament: async (req, res) => {
        try {
            const { id } = req.params;
            await Departament.delete(id);
            res.status(200).json({ message: 'Departament Deleted successful!' });
        } catch (error) {
            res.status(500).json({ message: 'Error to delete the departament', error: error.message });
        }
    }
};

module.exports = departamentController;