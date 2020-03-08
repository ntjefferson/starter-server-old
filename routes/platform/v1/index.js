const express = require('express');
const router = express.Router();
const handleException = require('../../../utils/handleException')

router.post('/info', handleException(require('./info')))

module.exports = router;