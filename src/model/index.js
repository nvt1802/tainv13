const { sequelize } = require('../config/database')
const Users = require('./users')
const Role = require('./role')
const Exams = require('./exams')
const Questions = require('./questions')
const Batches = require('./batches')

;(async () => {
  await sequelize.sync()
})()

module.exports = {
  User: Users.Users,
  Role: Role,
  Exams: Exams,
  Questions: Questions,
  Batches: Batches,
}
