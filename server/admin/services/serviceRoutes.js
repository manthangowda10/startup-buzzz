const express= require('express');
const router = express.Router();
const {manageServices,modifyService,deleteService} = require('./serviceControl');

router.post('/manage', manageServices);
router.put('/modifyService/:id',modifyService);
router.delete('/deleteService/:id',deleteService);

module.exports = router;