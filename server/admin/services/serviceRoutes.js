const express= require('express');
const router = express.Router();
const {manageServices} = require('./serviceControl');

router.post('/manage', manageServices);


module.exports = router;