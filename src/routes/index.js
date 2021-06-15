const path = '/api'
module.exports = (app) => {
  require('../middleware/authenticateAdmin')(app)
  require('../middleware/authenticateUsers')(app)
  // const { sequelize, dataTypes } = require('../config/database')
  // const model = require('../model')

  const authRouter = require('../api/auth')()

  app.use(authRouter)
  const users = require('../api/users')()
  const personRouter = require('../api/persons')()

  app.use(path, users)
  app.use(path, personRouter)

  app.get('/', async (req, res) => {
    // model.Person.findAll({ include: [{ model: model.Profile }] }).then(
    //   (items) => {
    //     res.json(items)
    //   }
    // )
    res.render('index.ejs', { msg: 'HELLO WORLD' })
  })

  // app.get("*", async (req, res) => {
  //   res.status(404).json({ msg: "not found" })
  // })
}
