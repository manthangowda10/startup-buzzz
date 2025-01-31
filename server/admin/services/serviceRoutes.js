const express= require('express');
const router = express.Router();
const {manageServices,modifyService,deleteService} = require('./serviceControl');
const {adminAuthenticate} = require('../../middleware/adminauthenticate');

router.post('/manage',adminAuthenticate, manageServices);
router.put('/modifyService/:id',adminAuthenticate,modifyService);
router.delete('/deleteService/:id',adminAuthenticate,deleteService);

module.exports = router;