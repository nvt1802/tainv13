module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    usersId: {
      type: DataTypes.UUID,
      field: "users_id",
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
      field: "username",
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
      field: "password",
    },
  })
  ;(async () => {
    await sequelize.sync()
  })()
  return Users
}
