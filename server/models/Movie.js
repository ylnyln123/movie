const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Model extends Sequelize.Model { }

  Model.init({
    name: {
      type: DataTypes.STRING
    },
    year: {
      type: DataTypes.SMALLINT
    },
    director: {
      type: DataTypes.STRING
    },
    actor: {
      type: DataTypes.STRING
    },
    video_url: {
      type: DataTypes.TEXT
    },
    genre: {
      type: DataTypes.STRING
    },
    poster: {
      type: DataTypes.STRING
    },
    rating: {
      type: DataTypes.STRING
    },
    imdb_id: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    }
  },
  {
    sequelize,
    modelName: 'Movie'
  })
  return Model
}
