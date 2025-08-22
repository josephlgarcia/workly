const LeaveStatus = require('../models/leaves_status.model');

const leaveStatusController = {
    getAllLeavesStatus: async (req, res) => {
        try {
            const leavesStatus = await LeaveStatus.getAll();
            res.json(leavesStatus);
        } catch (error) {
            res.status(500).json({ message: 'Error to get all leavesStatus', error: error.message });
        }
    },

    getLeaveStatusById: async (req, res) => {
        try {
            const leaveStatus = await LeaveStatus.getById(req.params.id);
        if (!leaveStatus) {
            return res.status(404).json({ message: 'LeaveStatus not found' });
        }
        res.json(leaveStatus);
        } catch (error) {
            res.status(500).json({ message: 'Error to get the leaveStatus', error: error.message });
        }
    },

    createLeaveStatus: async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'LeaveStatus name is required field.' });
        }

        try {
            const newLeaveStatusId = await LeaveStatus.create(req.body);
            res.status(201).json({ message: 'LeaveStatus Created successful!', id: newLeaveStatusId });
        } catch (error) {
            res.status(500).json({ message: 'Error to create the leaveStatus', error: error.message });
        }
    },

    updateLeaveStatus: async (req, res) => {
        try {
            const { id } = req.params;
            await LeaveStatus.update(id, req.body);
            res.status(200).json({ message: 'LeaveStatus Updated successful!'});
        } catch (error) {
            res.status(500).json({ message: 'Error to update the leaveStatus', error: error.message });
        }
    },

    deleteLeaveStatus: async (req, res) => {
        try {
            const { id } = req.params;
            await LeaveStatus.delete(id);
            res.status(200).json({ message: 'LeaveStatus Deleted successful!' });
        } catch (error) {
            res.status(500).json({ message: 'Error to delete the leaveStatus', error: error.message });
        }
    }
};

module.exports = leaveStatusController;