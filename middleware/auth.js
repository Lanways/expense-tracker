module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', 'plaese login then use')
    res.redirect('/users/login')
  }
}