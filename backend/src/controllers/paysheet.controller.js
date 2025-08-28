const Paysheet = require('../models/paysheet.model');

const paysheetController = {
    getAllPaysheets: async (req, res) => {
        try {
            const paysheets = await Paysheet.getAll();
            res.json(paysheets);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener todas las nóminas', error: error.message });
        }
    },

    getPaysheetById: async (req, res) => {
        try {
            const paysheet = await Paysheet.getById(req.params.id);
            if (!paysheet) {
                return res.status(404).json({ message: 'Nómina no encontrada' });
            }
            res.json(paysheet);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener la nómina', error: error.message });
        }
    },

    createPaysheet: async (req, res) => {
        const { employee_id, bonus, overtimes, socialSecurities } = req.body;

        if (!employee_id) {
            return res.status(400).json({ message: 'El ID del empleado es un campo requerido.' });
        }

        const paysheetData = {
            employee_id,
            bonus: bonus || 0, 
        };

        try {
            const newPaysheetId = await Paysheet.create(paysheetData, overtimes, socialSecurities);
            res.status(201).json({ message: 'Nómina creada exitosamente!', id: newPaysheetId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al crear la nómina', error: error.message });
        }
    },
};

module.exports = paysheetController;
