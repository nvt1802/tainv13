const { sequelize, dataTypes } = require('../../config/database')

const Profile = sequelize.define(
  'profile',
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

module.exports = Profile
