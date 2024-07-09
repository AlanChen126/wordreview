var about = function (req, res, next) {
  res.render('about', req.session);
}

module.exports = about;