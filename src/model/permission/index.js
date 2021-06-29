const { sequelize, dataTypes } = require('../../config/database')

const Permission = sequelize.define(
  'permission',
  {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
    },
    permissionName: dataTypes.STRING,
  },
  { timestamps: false }
)

module.exports = Permission
