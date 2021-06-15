const usersRouter = require('express').Router()
// const { body, validationResult, param } = require('express-validator')
const model = require('../../model')

module.exports = () => {
  // GET
  usersRouter.get('/admin', async (req, res) => {
    model.User.findAll().then((user) => {
      res.json(user)
    })
  })
  // POST

  // PUT

  // DELETE

  return usersRouter
}
