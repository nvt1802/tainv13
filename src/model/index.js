const { sequelize, dataTypes } = require("../config/database")
const User = require("./User")(sequelize, dataTypes)

module.exports = {
  User: User,
}
