const express = require('express');
const { bookAppointement, modifyAppointement, cancelAppointement } = require('./appointementController')
const router = express.Router();
const userAuthenticate = require('/home/manthan/Desktop/Buzzz/startup/server/middleware/authenticate.js')

router.post('/',userAuthenticate,bookAppointement);

router.put('/:appointementId',userAuthenticate,modifyAppointement);

router.delete('/:appointementId',userAuthenticate,cancelAppointement);

module.exports = router;