function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next()
  res.redirect('/login')
}

function isAdmin(req, res, next) {
  if (req.user.isAdmin) return next()
  res.redirect('/products')
}

function isSelfOrAdmin(req, res, next) {
  if (req.params.id === req.user.id || req.user.isAdmin) return next()
  res.redirect('/')
}

module.exports = {
  isLoggedIn,
  isAdmin,
  isSelfOrAdmin
}
