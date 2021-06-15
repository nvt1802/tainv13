module.exports = (sequelize, dataTypes) => {
  const Profile = require('../profile')(sequelize, dataTypes)
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

  return Person
}
