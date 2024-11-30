'use strict';

const { Wish, Participant, Shuffling } = require('../models');
require('dotenv').config();
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { NODE_ENV } = process.env;
    if (NODE_ENV === 'development' || !NODE_ENV) {
      await Participant.bulkCreate([
        {
          telegramUserId: 3069620,
          telegramUsername: 'grentank',
          hasStartedBot: true,
        },
        {
          telegramUserId: 523600769,
          telegramUsername: 'tanya_batyukova',
          hasStartedBot: false,
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
