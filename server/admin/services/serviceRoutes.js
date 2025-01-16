const express= require('express');
const router = express.Router();
const {manageServices,modifyService} = require('./serviceControl');

router.post('/manage', manageServices);
router.put('/modifyService/:id',modifyService)


module.exports = router;