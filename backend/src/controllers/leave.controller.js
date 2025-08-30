const Leave = require('../models/leave.model');

const leaveController = {
    getAllLeaves: async (req, res) => {
        try {
            const leaves = await Leave.getAll();
            res.status(200).json(leaves);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener las solicitudes de permiso', error: error.message });
        }
    },

    getLeaveById: async (req, res) => {
        try {
            const leave = await Leave.getById(req.params.id);
        if (!leave) {
            return res.status(404).json({ message: 'leave not found' });
        }
        res.json(leave);
        } catch (error) {
            res.status(500).json({ message: 'Error to get the leave', error: error.message });
        }
    },

    createLeave: async (req, res) => {
        const { employee_id, leave_status_id, leave_type_id, start_day, end_day, description } = req.body;

        if (!employee_id || !leave_status_id || !leave_type_id || !start_day || !end_day || !description) {
            return res.status(400).json({ message: 'Por favor, proporcione todos los campos requeridos.' });
        }

        try {
            const newLeaveId = await Leave.create(req.body);
            res.status(201).json({ message: 'Solicitud de permiso creada con éxito!', id_leave: newLeaveId });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al crear la solicitud de permiso', error: error.message });
        }
    },

    updateLeave: async (req, res) => {
        try {
            const leaveId = req.params.id;
            const updated = await Leave.update(leaveId, req.body);
            if (!updated) {
                return res.status(404).json({ message: 'Solicitud de permiso no encontrada' });
            }
            res.status(200).json({ message: 'Solicitud de permiso actualizada con éxito!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al actualizar la solicitud de permiso', error: error.message });
        }
    },

    deleteLeave: async (req, res) => {
        try {
            const leaveId = req.params.id;
            const deleted = await Leave.delete(leaveId);
            if (!deleted) {
                return res.status(404).json({ message: 'Solicitud de permiso no encontrada' });
            }
            res.status(200).json({ message: 'Solicitud de permiso eliminada con éxito!' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al eliminar la solicitud de permiso', error: error.message });
        }
    }
};

module.exports = leaveController;
