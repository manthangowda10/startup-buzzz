const express= require('express');
const router = express.Router();
const { viewAppointements } = require('./appointementController');
const {adminAuthenticate} = require('../../middleware/adminauthenticate');


router.get('/view',adminAuthenticate,viewAppointements);

module.exports = router;