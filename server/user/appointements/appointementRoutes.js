const express = require('express');
const { bookAppointement, modifyAppointement, cancelAppointement } = require('./appointementController')
const router = express.Router();

router.post('/',bookAppointement);

router.put('/:appointementId',modifyAppointement);

router.delete('/:appointementId',cancelAppointement)

module.exports = router;