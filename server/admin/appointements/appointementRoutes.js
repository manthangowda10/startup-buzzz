const express= require('express');
const router = express.Router();
const { viewAppointements } = require('./adminController');


router.get('/viewAppointements',viewAppointements);

module.exports = router;