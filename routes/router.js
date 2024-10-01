const express = require('express');
const router = express.Router();
const mcdl = require('../controller/EcommController');

router.get('/', mcdl.index);
router.get('/shop', mcdl.shop);
router.get('/aboutUs', mcdl.aboutUs);
router.get('/services', mcdl.services);
router.get('/blog', mcdl.blog);
router.get('/contactUs', mcdl.contactUs);

module.exports = router;


