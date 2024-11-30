'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wish extends Model {
    static associate({ Participant }) {
      this.belongsTo(Participant, { foreignKey: 'participantId', as: 'participant' });
    }
  }
  Wish.init(
    {
      telegramFileId: DataTypes.STRING,
      participantId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Wish',
    },
  );
  return Wish;
};
