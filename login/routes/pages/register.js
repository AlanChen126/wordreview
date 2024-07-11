var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const fs = require('fs-extra');
const db = require('../../database/database.json');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: false
}));

// 邮箱验证函数
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// 用户名验证函数，允许2到8位的小写英文字母、大写英文字母、数字和连字符
function isValidUsername(username) {
  const re = /^[a-zA-Z0-9-]{2,8}$/;
  return re.test(username);
}

// 密码验证函数，密码长度在5到8位之间，包含小写英文字母、大写英文字母和数字
function isValidPassword(password) {
  const re = /^[a-zA-Z0-9]{5,8}$/;
  return re.test(password);
}

// 注册页面路由
router.get('/register', function (req, res) {
  // 渲染注册页面，并显示会话中可能存在的响应消息
  res.render('register', { response: req.session.response || null });
});

// 注册逻辑
router.post('/register', function (req, res) {
  var email = req.body.email.toLowerCase();
  var username = req.body.name;
  var password = req.body.secret;

  // 清空之前的响应消息
  req.session.response = null;

  // 验证输入
  if (!isValidEmail(email)) {
    req.session.response = '邮箱地址不符合要求。';
    return res.redirect('/register');
  }
  if (!isValidUsername(username)) {
    req.session.response = '用户名必须在2到8位之间，可以包含小写英文字母、大写英文字母、数字和连字符。';
    return res.redirect('/register');
  }
  if (!isValidPassword(password)) {
    req.session.response = '密码必须在5到8位之间，只能包含小写英文字母、大写英文字母和数字。';
    return res.redirect('/register');
  }

  // 检查邮箱是否已存在
  const emailExists = db.users.some(user => user.email === email);
  if (emailExists) {
    req.session.response = '该邮箱已被注册。';
    return res.redirect('/register');
  }

  // 添加新用户逻辑
  const newUser = {
    email: email,
    level: 0,
    username: username, // 使用 username 而不是 name
    password: password
  };
  db.users.push(newUser);
  try {
    fs.outputJsonSync('./database/database.json', db, { spaces: 2 });
    req.session.response = '注册成功，请登录。';
    setTimeout(() => {
      res.redirect('/login'); // 重定向到登录页面
    }, 500)

  } catch (error) {
    req.session.response = '注册时发生错误，请稍后重试。';
    console.error(error);
    res.redirect('/register');
  }
});

// 其他路由...

module.exports = router;