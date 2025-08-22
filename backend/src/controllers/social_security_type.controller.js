const SocialSecurityType = require('../models/social_security_type.model');

const socialSecurityTypeController = {
    getAllSocialSecurityTypes: async (req, res) => {
        try {
            const socialSecurityTypes = await SocialSecurityType.getAll();
            res.json(socialSecurityTypes);
        } catch (error) {
            res.status(500).json({ message: 'Error to get all social Security Types', error: error.message });
        }
    },

    getSocialSecurityTypeById: async (req, res) => {
        try {
            const socialSecurityType = await SocialSecurityType.getById(req.params.id);
        if (!socialSecurityType) {
            return res.status(404).json({ message: 'Social Security Type not found' });
        }
        res.json(socialSecurityType);
        } catch (error) {
            res.status(500).json({ message: 'Error to get the social Security Type', error: error.message });
        }
    },

    createSocialSecurityType: async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Social Security Type name is required field.' });
        }

        try {
            const newSocialSecurityTypeId = await SocialSecurityType.create(req.body);
            res.status(201).json({ message: 'Social Security Type Created successful!', id: newSocialSecurityTypeId });
        } catch (error) {
            res.status(500).json({ message: 'Error to create the social Security Type', error: error.message });
        }
    },

    updateSocialSecurityType: async (req, res) => {
        try {
            const { id } = req.params;
            await SocialSecurityType.update(id, req.body);
            res.status(200).json({ message: 'Social Security Type Updated successful!'});
        } catch (error) {
            res.status(500).json({ message: 'Error to update the social Security Type', error: error.message });
        }
    },

    deleteSocialSecurityType: async (req, res) => {
        try {
            const { id } = req.params;
            await SocialSecurityType.delete(id);
            res.status(200).json({ message: 'Social Security Type Deleted successful!' });
        } catch (error) {
            res.status(500).json({ message: 'Error to delete the social Security Type', error: error.message });
        }
    }
};

module.exports = socialSecurityTypeController;