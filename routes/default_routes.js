const router = require('express').Router();
const controller = require('../controller/default_controllers.js');

router.get('/', controller.index);

module.exports = router;
