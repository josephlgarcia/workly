const Leave = require('../models/leave.model');
const LeavesType = require('../models/leaves_type.model');
const Attachment = require('../models/attachment.model');
const fs = require('fs');

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

    getLeavesByEmployeeId: async (req, res) => {
        try {
            const leaves = await Leave.getByEmployeeId(req.params.id);
            res.status(200).json(leaves);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener las solicitudes del empleado', error: error.message });
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
        const file = req.file;

        if (!employee_id || !leave_status_id || !leave_type_id || !start_day || !end_day || !description) {
            if (file) {
                fs.unlinkSync(file.path);
            }
            return res.status(400).json({ message: 'Por favor, proporcione todos los campos requeridos.' });
        }

        try {
            const leaveType = await LeavesType.getById(leave_type_id);

            if (!leaveType) {
                if (file) { fs.unlinkSync(file.path); }
                return res.status(404).json({ message: 'Tipo de permiso no encontrado' });
            }

            if (leaveType.leaves_file && !file) {
                return res.status(400).json({ message: 'Este tipo de permiso requiere un archivo adjunto.' });
            }

            if (!leaveType.leaves_file && file) {
                fs.unlinkSync(file.path); 
                return res.status(400).json({ message: 'Este tipo de permiso no requiere un archivo adjunto.' });
            }

            const newLeaveId = await Leave.create(req.body);

            if (file) {
                const newAttachment = {
                    leave_id: newLeaveId,
                    file_name: file.filename,
                    file_route: `uploads/${file.filename}`, 
                    comments: 'Archivo adjunto del permiso.'
                };
                await Attachment.create(newAttachment);
            }

            res.status(201).json({ message: 'Solicitud de permiso creada con éxito!', id_leave: newLeaveId });
        } catch (error) {
            console.error(error);
            if (file) {
                fs.unlinkSync(file.path);
            }
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
