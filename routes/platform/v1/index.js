const express = require('express');
const router = express.Router();
const handleException = require('../../../utils/handleException')

// use const jwtAuth = require("../../../middleware/jwtAuth"); to authenticate JWT

router.post('/info', handleException(require('./info/info')))

module.exports = router;