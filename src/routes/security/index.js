const option = require("./option.json")
module.exports = (app, passport) => {
  app.use(
    option.Path,
    (req, res, next) => {
      next()
    },
    passport.authenticate("jwt", { session: false })
  )
}
