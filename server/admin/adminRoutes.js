const express= require('express');
const router = express.Router();
const {manageServices, viewAppointements} = require('./adminController');
const adminSignUp = require('./adminController');

router.post('/manageServices', manageServices);
router.get('/viewAppointements',viewAppointements);
router.post('/signup',adminSignUp);

module.exports = router;