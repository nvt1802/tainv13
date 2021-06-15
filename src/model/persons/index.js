const { sequelize, dataTypes } = require('../../config/database')

const Profile = require('../profile')
const Person = sequelize.define(
  'person',
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

Person.belongsTo(Profile)

module.exports = Person
