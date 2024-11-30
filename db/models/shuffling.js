'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shuffling extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Shuffling.init({
    fromUserId: DataTypes.INTEGER,
    toUserId: DataTypes.INTEGER,
    accepted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Shuffling',
  });
  return Shuffling;
};