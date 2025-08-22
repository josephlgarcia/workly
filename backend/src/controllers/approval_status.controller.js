const ApprovalStatus = require('../models/approval_status.model');

const approvalStatusController = {
    getAllApprovalStatus: async (req, res) => {
        try {
            const approvalsStatus = await ApprovalStatus.getAll();
            res.json(approvalsStatus);
        } catch (error) {
            res.status(500).json({ message: 'Error to get all approvals Status', error: error.message });
        }
    },

    getApprovalStatusById: async (req, res) => {
        try {
            const approvalStatus = await ApprovalStatus.getById(req.params.id);
        if (!approvalStatus) {
            return res.status(404).json({ message: 'Approval Status not found' });
        }
        res.json(approvalStatus);
        } catch (error) {
            res.status(500).json({ message: 'Error to get the approval Status', error: error.message });
        }
    },

    createApprovalStatus: async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Approval Status name is required field.' });
        }

        try {
            const newApprovalStatusId = await ApprovalStatus.create(req.body);
            res.status(201).json({ message: 'Approval Status Created successful!', id: newApprovalStatusId });
        } catch (error) {
            res.status(500).json({ message: 'Error to create the approval Status', error: error.message });
        }
    },

    updateApprovalStatus: async (req, res) => {
        try {
            const { id } = req.params;
            await ApprovalStatus.update(id, req.body);
            res.status(200).json({ message: 'Approval Status Updated successful!'});
        } catch (error) {
            res.status(500).json({ message: 'Error to update the approval Status', error: error.message });
        }
    },

    deleteApprovalStatus: async (req, res) => {
        try {
            const { id } = req.params;
            await ApprovalStatus.delete(id);
            res.status(200).json({ message: 'Approval Status Deleted successful!' });
        } catch (error) {
            res.status(500).json({ message: 'Error to delete the approval Status', error: error.message });
        }
    }
};

module.exports = approvalStatusController;