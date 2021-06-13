module.exports = (sequelize, dataTypes) => {
  const Person = require("../persons")(sequelize, dataTypes)
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

  return Profile
}
