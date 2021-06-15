const usersRouter = require('express').Router()
// const { body, validationResult, param } = require('express-validator')
const model = require('../../model')

usersRouter.get('/admin', async (req, res) => {
  model.User.findAll().then((user) => {
    res.json(user)
  })
})

module.exports = usersRouter
