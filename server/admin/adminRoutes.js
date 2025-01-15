const express= require('express');
const router = express.Router();
const viewAppointements = require('./appointements/appointementRoutes');
const manageServices = require('./services/serviceRoutes');
const { adminSignUp, adminLogin } = require('./adminController');

router.use('/services', manageServices);
router.use('/appointements',viewAppointements);
router.post('/signup',adminSignUp);
router.post('/login',adminLogin);

module.exports = router;