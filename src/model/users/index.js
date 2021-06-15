module.exports = (sequelize, dataTypes) => {
  return sequelize.define('users', {
    id: {
      type: dataTypes.UUID,
      field: 'id',
      primaryKey: true,
      defaultValue: dataTypes.UUIDV4,
    },
    email: {
      type: dataTypes.STRING,
      validate: {
        notEmpty: true,
      },
      field: 'email',
    },
    password: {
      type: dataTypes.STRING,
      validate: {
        notEmpty: true,
      },
      field: 'password',
    },
    role: {
      type: dataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  })
}
