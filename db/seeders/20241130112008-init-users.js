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
          telegramUserId: 2233, // 523600769,
          telegramUsername: 'tanya_batyukova-not-real',
          hasStartedBot: false,
        },
        {
          telegramUserId: 1,
          telegramUsername: 'alex',
          hasStartedBot: false,
        },
        {
          telegramUserId: 2,
          telegramUsername: 'bob',
          hasStartedBot: false,
        },
        {
          telegramUserId: 3,
          telegramUsername: 'carl',
          hasStartedBot: true,
        },
        {
          telegramUserId: 4,
          telegramUsername: 'dimon',
          hasStartedBot: true,
        },
        {
          telegramUserId: 5,
          telegramUsername: 'enot',
          hasStartedBot: false,
        },
        {
          telegramUserId: 6,
          telegramUsername: 'fedor',
          hasStartedBot: true,
        },
      ]);

      await Wish.bulkCreate([
        // {
        //   telegramFileId:
        //     'DQACAgIAAxkBAAN_Z0wHpcJRYjRerorfNNkRja0RZssAAgJUAAJtE2BKK_sqPU17Mtw2BA',
        //   participantId: 2,
        // },
        // {
        //   telegramFileId: '1234',
        //   participantId: 2,
        // },
        {
          telegramFileId:
            'DQACAgIAAxkBAAOBZ0wH3vtLy1QRY2R0S7S6xskrQ4wAAgRUAAJtE2BKoaEvl-3nxGM2BA',
          participantId: 3,
        },
        {
          telegramFileId:
            'DQACAgIAAxkBAAODZ0wIBjOfhkeNatlwKk6Oxgr5wDYAAgZUAAJtE2BK60IYKqkLY-Q2BA',
          participantId: 5,
        },
        {
          telegramFileId:
            'DQACAgIAAxkBAAOFZ0wIXIWupLLpc_fTxri1-oi5zK8AAgdUAAJtE2BKlntJtdCqMt82BA',
          participantId: 7,
        },
        {
          telegramFileId:
            'DQACAgIAAxkBAAOHZ0wId8r62pSAQTO9dUQIKj2M2GYAAghUAAJtE2BKixBnF4wcuSA2BA',
          participantId: 7,
        },
        {
          telegramFileId:
            'DQACAgIAAxkBAAOJZ0wImp6qSdyc6zQGyvH87N7NrCkAAgpUAAJtE2BK1CMFoqi4rkg2BA',
          participantId: 8,
        },
        {
          telegramFileId:
            'DQACAgIAAxkBAAOLZ0wIs5KHlDkH0SfOdn9uhqQFG0EAAgtUAAJtE2BKNyHdSknqb582BA',
          participantId: 8,
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
