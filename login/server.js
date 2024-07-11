const express = require('express');
const session = require('express-session');
const routes = require('./routes/routes');
const fs = require('fs-extra');

var app = express();

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'sebmandal.com=your_mom',
  resave: false,
  saveUninitialized: true,
}));

const path = require('path');
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);

// app.listen(port);
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  // 服务器启动后，延迟0.5秒打开浏览器
  setTimeout(() => {
    require('opn')('http://localhost:' + port);
  }, 500);
});