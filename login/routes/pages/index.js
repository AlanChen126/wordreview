var index = function (req, res, next) {
  res.render('index', req.session);
}

module.exports = index;