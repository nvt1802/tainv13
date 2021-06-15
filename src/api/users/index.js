const usersRouter = require('express').Router()
// const { body, validationResult, param } = require('express-validator')
const { sequelize, dataTypes } = require('../../config/database')
const User = require('../../model/users')(sequelize, dataTypes)

module.exports = () => {
  // GET
  usersRouter.get('/admin', async (req, res) => {
    User.findAll().then((user) => {
      res.json(user)
    })
  })
  // POST

  // PUT

  // DELETE

  return usersRouter
}
