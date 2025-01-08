const express = require('express');
const { bookAppointement, modifyAppointement, cancelAppointement } = require('./appointementController')
const router = express.Router();

router.post('/appointements',bookAppointement);

router.put('/appointements/:appointementId',modifyAppointement);

router.delete('/appointements/:appointementId',cancelAppointement)

module.exports = router;