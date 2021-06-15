const path = '/api'
module.exports = (app) => {
  require('../middleware/authenticateAdmin')(app)
  require('../middleware/authenticateUsers')(app)

  const authRouter = require('../api/auth')()

  app.use(authRouter)
  const users = require('../api/users')()
  const personRouter = require('../api/persons')()

  app.use(path, users)
  app.use(path, personRouter)

  app.get('/', async (req, res) => {
    res.render('index.ejs', { msg: 'HELLO WORLD' })
  })

  // app.get("*", async (req, res) => {
  //   res.status(404).json({ msg: "not found" })
  // })
}
