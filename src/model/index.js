const { sequelize, dataTypes } = require('../config/database')
const Users = require('./users')(sequelize, dataTypes)
const Person = require('./persons')(sequelize, dataTypes)
const Profile = require('./profile')(sequelize, dataTypes)

;(async () => {
  await sequelize.sync()
})()

module.exports = {
  User: Users,
  Person: Person,
  Profile: Profile,
}
