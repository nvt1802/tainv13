const { sequelize } = require('../config/database')
const Users = require('./users')
const Person = require('./persons')
const Profile = require('./profile')
const Permission = require('./permission')

;(async () => {
  await sequelize.sync()
})()

module.exports = {
  User: Users,
  Person: Person,
  Profile: Profile,
  Permission: Permission,
}
