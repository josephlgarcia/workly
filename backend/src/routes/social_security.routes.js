const express = require('express');
const router = express.Router();
const socialSecurityController = require('../controllers/social_security.controller');

router.get('/', socialSecurityController.getAllSocialSecurities); 
router.get('/:id', socialSecurityController.getSocialSecurityById);

router.post('/', socialSecurityController.createSocialSecurity); 
router.put('/:id', socialSecurityController.updateSocialSecurity); 
router.delete('/:id', socialSecurityController.deleteSocialSecurity); 

module.exports = router;