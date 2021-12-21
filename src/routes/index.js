const swaggerUi = require('swagger-ui-express')
const model = require('../model')
const authRouter = require('../api/auth')
const users = require('../api/users')
const examsRouter = require('../api/exams')
const questionsRouter = require('../api/questions')
const swaggerDocument = require('../docs/swagger.json')

module.exports = (app) => {
  require('../middleware/authenticateAdmin')(app)
  require('../middleware/authenticateUsers')(app)

  app.use(authRouter)
  app.use('/api', users, examsRouter)
  app.use('/api', users, questionsRouter)

  var options = {
    explorer: false,
    // customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'Authenticate',
    customfavIcon: '/assets/favicon.ico',
  }

  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options))

  app.get('/test', async (req, res) => {
    model.Person.findAll({ include: [{ model: model.Profile }] }).then(
      (items) => {
        res.json(items)
      }
    )
  })

  app.get('*', async (req, res) => {
    res.status(404).json({ msg: 'not found' })
  })
}
