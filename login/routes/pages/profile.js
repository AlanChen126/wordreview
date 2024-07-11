var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const fs = require('fs-extra');
const {
  render
} = require('jade');
var passport = require('passport');

var db = require('../../database/database.json');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: false
}));

router.post('/profile', function (req, res) {
  var users = db.users;
  var projects = db.projects;
  email = req.body.email.toLowerCase();
  secret = req.body.secret;

  // 遍历用户数组，查找匹配的用户
  users.map((user) => {
    if (user.email + user.key == email + secret) {
      // 找到匹配的用户，将用户信息存入session
      req.session.user = user;
      req.session.projects = projects;
      req.session.authorised = true;
      // 如果用户是管理员，将数据库信息存入session
      if (user.level == 100) {
        req.session.db = db;
      }
    }
  });
  // 重定向到profile页面
  res.redirect('/profile');
});

// 重定向登录页面
router.get('/login', function (req, res) {
  req.session.authorised ? res.redirect('/profile') : res.render('profile', req.session);
});

// 重定向profile页面
router.get('/profile', function (req, res) {
  if (req.session.authorised) {
    req.session.projects = db.projects;
    req.session.authorised = true;
    if (req.session.user.level == 100) {
      req.session.db = db;
    }
    res.render('profile', req.session);
  } else {
    res.redirect('/login');
  }
});

// 处理登出请求
router.get('/profile/:key', function (req, res) {
  if (req.params.key == 'logout') {
    req.session.destroy();
    res.redirect('/login');
  }
});

module.exports = router;