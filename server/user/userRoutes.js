const express = require('express');
const router = express.Router();
const { signup, login } = require('./userController');
const {appointementRoutes} = require('./appointements/appointementRoutes');

router.use('/appointements',appointementRoutes)

router.post('/signup', signup);
router.post('/login',login);

module.exports = router;

