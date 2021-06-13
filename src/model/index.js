const { sequelize, dataTypes } = require("../config/database")
const Users = require("./users")(sequelize, dataTypes)
// const Person = require("./persons")(sequelize, dataTypes)
const Profile = require("./profile")(sequelize, dataTypes)

const Person = sequelize.define(
  "person",
  {
    personId: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: dataTypes.STRING,
    points: dataTypes.INTEGER,
  },
  { timestamps: false }
)

module.exports = {
  User: Users,
  Person: Person,
  Profile: Profile,
}
