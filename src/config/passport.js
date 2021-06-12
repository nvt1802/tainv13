const JwtStrategy = require("passport-jwt").Strategy
const ExtractJwt = require("passport-jwt").ExtractJwt
const { sequelize, dataTypes } = require("../config/database")

module.exports = function (passport) {
  const User = require("../model/User")(sequelize, dataTypes)
  var opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
  opts.secretOrKey = process.env.ACCESS_TOKEN_SECRET || "tainv13"
  passport.use(
    new JwtStrategy(opts, function (jwt_payload, done) {
      User.findAll({
        where: {
          usersId: jwt_payload.usersId,
        },
      }).then((users) => {
        if (users.length === 0) {
          done(null, false)
        } else {
          done(null, users[0].dataValues)
        }
      })
    })
  )
}
