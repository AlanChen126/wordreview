// 定义了一个Express应用程序的路由器，用于处理用户注册功能
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const fs = require('fs-extra');
const db = require('../../database/database.json');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: false
}));

// redirects or renders
router.get('/register', function (req, res) {
  req.session.authorised ? res.redirect('/profile') : res.render('register');
});

router.post('/register', function (req, res) {
  email = req.body.email.toLowerCase();
  fullname = req.body.name;
  key = req.body.secret;

  emailExists = false;
  db.users.forEach((user) => { if (user.email == email) { emailExists = true; } });

  if (!emailExists) {
    new_users = [...db.users, {
      email: email,
      level: 0,
      name: fullname,
      key: key
    }];
    db.users = new_users;
    fs.writeJSONSync('./database/database.json', db); //JSON.stringify(db)
    req.session.response = 'Registration successful.';
    res.render('profile', req.session);
  } else { req.session.response = 'Already registered.'; res.render('register', req.session); }
});

module.exports = router;