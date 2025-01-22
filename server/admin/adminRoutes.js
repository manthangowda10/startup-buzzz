const express= require('express');
const router = express.Router();
const viewAppointements = require('./appointements/appointementRoutes');
const manageServices = require('./services/serviceRoutes');
const { adminSignUp, adminLogin } = require('./adminController');
const adminAuthenticate = require('../middleware/adminauthenticate');



router.use('/services',adminAuthenticate, manageServices); //admin 
router.use('/appointements',adminAuthenticate, viewAppointements);
router.post('/signup',adminSignUp); //Admin signup route
router.post('/login',adminLogin);//Admin login route

module.exports = router;