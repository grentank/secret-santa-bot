'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    static associate({ Wish, Shuffling, Chat }) {
      this.hasMany(Wish, { foreignKey: 'participantId', as: 'wishes' });
      this.hasMany(Shuffling, { foreignKey: 'fromParticipantId', as: 'shufflingFrom' });
      this.hasMany(Shuffling, { foreignKey: 'toParticipantId', as: 'shufflingTo' });
      this.belongsTo(Chat, { foreignKey: 'chatId', as: 'chat' });
    }
  }
  Participant.init(
    {
      telegramUserId: DataTypes.INTEGER,
      telegramUsername: DataTypes.STRING,
      hasStartedBot: DataTypes.BOOLEAN,
      chatId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Participant',
    },
  );
  return Participant;
};
