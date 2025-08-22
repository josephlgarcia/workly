const express = require('express');
const router = express.Router();
const socialSecurityTypeController = require('../controllers/social_security_type.controller');

router.get('/', socialSecurityTypeController.getAllSocialSecurityTypes); 
router.get('/:id', socialSecurityTypeController.getSocialSecurityTypeById); 

router.post('/', socialSecurityTypeController.createSocialSecurityType);
router.put('/:id', socialSecurityTypeController.updateSocialSecurityType); 
router.delete('/:id', socialSecurityTypeController.deleteSocialSecurityType);

module.exports = router;