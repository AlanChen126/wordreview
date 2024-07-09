var express = require('express');
var router = express.Router();

var index = require('./pages/index');
var about = require('./pages/about');
var register = require('./pages/register');
var profile = require('./pages/profile');

router.get('/', index);
router.get('/about', about);
router.use(register);
router.use(profile);

module.exports = router;