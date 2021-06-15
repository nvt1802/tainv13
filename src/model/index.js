const { sequelize } = require('../config/database')
const Users = require('./users')
const Person = require('./persons')
const Profile = require('./profile')

;(async () => {
  await sequelize.sync()
})()

module.exports = {
  User: Users,
  Person: Person,
  Profile: Profile,
}
