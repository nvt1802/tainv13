'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('artists', {
    artistId: {
      type: DataTypes.UUID,
      field: 'artist_id',
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    artistName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
      field: 'artist_name'
    },
  });
  Artist.associate = function (models) {
    // associations can be defined here
  };
  (async () => {
    await sequelize.sync();
  })();
  return Artist;
};