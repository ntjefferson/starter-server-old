const express = require('express');
const router = express.Router();

router.use('/', require('./info'))

module.exports = router;