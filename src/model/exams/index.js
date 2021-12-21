const { sequelize, dataTypes } = require('../../config/database')

const Questions = require('../questions')
const Exams = sequelize.define(
  'exams',
  {
    id: {
      type: dataTypes.UUID,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
    },
    examName: dataTypes.STRING,
    pointPass: dataTypes.BIGINT,
    hour: dataTypes.BIGINT,
    minute: dataTypes.BIGINT,
  },
  { timestamps: false }
)

Questions.belongsTo(Exams)

module.exports = Exams
