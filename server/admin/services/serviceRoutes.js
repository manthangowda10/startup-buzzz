const express= require('express');
const router = express.Router();
const {manageServices, viewAppointements} = require('./adminController');

router.post('/manageServices', manageServices);


module.exports = router;