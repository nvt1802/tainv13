const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const Model = require("../model")

module.exports = function (passport) {
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET || "tainv13"
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      Model.User.findOne({
        where: {
          usersId: jwt_payload.usersId,
        },
      }).then((users) => {
        if (!users) {
          done(null, false, { test_messsage: "error" })
        } else {
          done(null, users.dataValues)
        }
      })
    })
  )
}
