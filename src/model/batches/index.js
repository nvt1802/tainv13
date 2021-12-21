const { sequelize, dataTypes } = require('../../config/database')

const { Users } = require('../users')
const Exams = require('../exams')
const Batches = sequelize.define(
  'batches',
  {
    id: {
      type: dataTypes.UUID,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
    },
    batchName: dataTypes.STRING,
    testScore: dataTypes.BIGINT,
    passed: dataTypes.BOOLEAN,
  },
  { timestamps: true }
)

Batches.belongsTo(Users)
Batches.belongsTo(Exams)

module.exports = Batches
