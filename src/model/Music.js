'use strict';
module.exports = (sequelize, DataTypes) => {
  const Music = sequelize.define('music', {
    trackId: {
      type: DataTypes.UUID,
      validate: {
        notEmpty: true
      },
      field: 'track_id',
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    trackName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
      field: 'track_name'
    },
    youtubeUrl: {
      type: DataTypes.STRING,
      field: 'youtube_url'
    },
    artistId: {
      type: DataTypes.UUID,
      field: 'artist_id',
    }
  });
  Music.associate = function (models) {
    Music.hasOne(models.Artist, {
      foreignKey: 'track_id',
      as: 'artist_id'
    });
  };
  (async () => {
    await sequelize.sync();
  })();
  return Music;
};
