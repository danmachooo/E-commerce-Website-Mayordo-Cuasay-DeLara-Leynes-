const express = require('express');
const ecom = require('../controller/eController');
const router = express.Router();


router.get('/', ecom.index);
//dagdag na lang kayo here wala pa itong laman

module.exports = router;