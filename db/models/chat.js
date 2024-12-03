'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate({ Participant }) {
      this.hasMany(Participant, { foreignKey: 'chatId', as: 'participants' });
    }
  }
  Chat.init(
    {
      telegramChatId: DataTypes.INTEGER,
      telegramChatName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Chat',
    },
  );
  return Chat;
};
