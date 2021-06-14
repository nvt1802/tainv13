module.exports = (app, passport) => {
  const Model = require("../model")
  const authRouter = require("./auth")()
  const personRouter = require("./persons")()
  require("./security")(app, passport)

  app.use(authRouter)
  app.use("/persons", personRouter)

  app.get("/", async (req, res) => {
    res.render("index.ejs", { msg: "HELLO WORLD" })
  })

  app.get("*", async (req, res) => {
    res.status(404).json({ msg: "not found" })
  })
}
