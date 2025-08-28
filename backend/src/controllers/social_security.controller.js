const SocialSecurity = require('../models/social_security.model');

const socialSecurityController = {
    getAllSocialSecurities: async (req, res) => {
        try {
            const socialSecurities = await SocialSecurity.getAll();
            res.json(socialSecurities);
        } catch (error) {
            res.status(500).json({ message: 'Error to get all social Securities', error: error.message });
        }
    },

    getSocialSecurityById: async (req, res) => {
        try {
            const socialSecurity = await SocialSecurity.getById(req.params.id);
        if (!socialSecurity) {
            return res.status(404).json({ message: 'Social Security not found' });
        }
        res.json(socialSecurity);
        } catch (error) {
            res.status(500).json({ message: 'Error to get the social Security', error: error.message });
        }
    },

    createSocialSecurity: async (req, res) => {
        const { name } = req.body;

        if (!name) {
            return res.status(400).json({ message: 'Social Security name is required field.' });
        }

        try {
            const newSocialSecurityId = await SocialSecurity.create(req.body);
            res.status(201).json({ message: 'Social Security Created successful!', id: newSocialSecurityId });
        } catch (error) {
            res.status(500).json({ message: 'Error to create the social Security', error: error.message });
        }
    },

    updateSocialSecurity: async (req, res) => {
        try {
            const { id } = req.params;
            await SocialSecurity.update(id, req.body);
            res.status(200).json({ message: 'Social Security Updated successful!'});
        } catch (error) {
            res.status(500).json({ message: 'Error to update the social Security', error: error.message });
        }
    },

    deleteSocialSecurity: async (req, res) => {
        try {
            const { id } = req.params;
            await SocialSecurity.delete(id);
            res.status(200).json({ message: 'Social Security Deleted successful!' });
        } catch (error) {
            res.status(500).json({ message: 'Error to delete the social Security', error: error.message });
        }
    }
};

module.exports = socialSecurityController;