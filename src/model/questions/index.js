const { sequelize, dataTypes } = require('../../config/database')

const Questions = sequelize.define(
  'questions',
  {
    questionId: {
      type: dataTypes.UUID,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false,
    },
    questionName: dataTypes.STRING,
    optionA: dataTypes.STRING,
    optionB: dataTypes.STRING,
    optionC: dataTypes.STRING,
    optionD: dataTypes.STRING,
    answer: dataTypes.STRING,
  },
  { timestamps: false }
)

module.exports = Questions
