'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shuffling extends Model {
    static associate({ Participant }) {
      this.belongsTo(Participant, {
        foreignKey: 'fromParticipantId',
        as: 'fromParticipant',
      });
      this.belongsTo(Participant, { foreignKey: 'toParticipantId', as: 'toParticipant' });
    }
  }
  Shuffling.init(
    {
      fromParticipantId: DataTypes.INTEGER,
      toParticipantId: DataTypes.INTEGER,
      accepted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Shuffling',
    },
  );
  return Shuffling;
};
