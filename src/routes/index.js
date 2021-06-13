module.exports = (app, passport) => {
  const Model = require("../model")
  const authRouter = require("./auth")(passport)
  const personRouter = require("./persons")(passport)

  app.use(authRouter)
  app.use(personRouter)

  app.get("/", async (req, res) => {
    Model.Person.findAll().then((person) => {
      res.json(person)
    })
  })

  app.get(
    "/test",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
      res.send(req.user)
    }
  )

  const getToken = function (headers) {
    if (headers && headers.authorization) {
      var parted = headers.authorization.split(" ")
      if (parted.length === 2) {
        return parted[1]
      } else {
        return null
      }
    } else {
      return null
    }
  }
}
