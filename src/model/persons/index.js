module.exports = (sequelize, dataTypes) => {
  return sequelize.define(
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
}
