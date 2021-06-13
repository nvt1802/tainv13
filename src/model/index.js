const { sequelize, dataTypes } = require("../config/database")

const Users = sequelize.define("users", {
  usersId: {
    type: dataTypes.UUID,
    field: "users_id",
    primaryKey: true,
    defaultValue: dataTypes.UUIDV4,
  },
  username: {
    type: dataTypes.STRING,
    validate: {
      notEmpty: true,
    },
    field: "username",
  },
  password: {
    type: dataTypes.STRING,
    validate: {
      notEmpty: true,
    },
    field: "password",
  },
})

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

const Profile = sequelize.define(
  "profile",
  {
    profileId: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: dataTypes.STRING,
  },
  { timestamps: false }
)

Profile.belongsTo(Person)

module.exports = {
  User: Users,
  Person: Person,
  Profile: Profile,
}
