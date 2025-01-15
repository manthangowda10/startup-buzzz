const express= require('express');
const router = express.Router();
const { viewAppointements } = require('./appointementController');


router.get('/view',viewAppointements);

module.exports = router;