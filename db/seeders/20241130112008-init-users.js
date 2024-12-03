'use strict';

const { Wish, Participant, Shuffling, Chat } = require('../models');
require('dotenv').config();
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { NODE_ENV } = process.env;
    if (NODE_ENV === 'development' || !NODE_ENV) {
      await Chat.bulkCreate([
        {
          telegramChatId: Number(process.env.ELBRUS_SECRET_SANTA_GROUP_ID_MSK),
          telegramChatName: 'MSK Elbrus',
          doneShuffling: false,
        },
        {
          telegramChatId: Number(process.env.ELBRUS_SECRET_SANTA_GROUP_ID_SPB),
          telegramChatName: 'SPB Elbrus',
          doneShuffling: false,
        },
      ]);
      await Participant.bulkCreate([
        {
          // id: 1,
          telegramUserId: 3069620,
          telegramUsername: 'grentank',
          hasStartedBot: true,
          chatId: 1,
        },
        {
          // id: 2,
          telegramUserId: 2233, // 523600769,
          telegramUsername: 'tanya_batyukova-not-real',
          hasStartedBot: false,
          chatId: 1,
        },
        {
          // id: 3,
          telegramUserId: 1,
          telegramUsername: 'alex',
          hasStartedBot: false,
          chatId: 1,
        },
        {
          // id: 4,
          telegramUserId: 2,
          telegramUsername: 'bob',
          hasStartedBot: false,
          chatId: 1,
        },
        {
          // id: 5,
          telegramUserId: 3,
          telegramUsername: 'carl',
          hasStartedBot: true,
          chatId: 1,
        },
        {
          // id: 6,
          telegramUserId: 4,
          telegramUsername: 'dimon',
          hasStartedBot: true,
          chatId: 1,
        },
        {
          // id: 7,
          telegramUserId: 5,
          telegramUsername: 'enot',
          hasStartedBot: false,
          chatId: 1,
        },
        {
          // id: 8,
          telegramUserId: 6,
          telegramUsername: 'fedor',
          hasStartedBot: true,
          chatId: 1,
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
