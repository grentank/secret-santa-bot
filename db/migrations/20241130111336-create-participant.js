'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Participants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      telegramUserId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
      },
      telegramUsername: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      hasStartedBot: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      chatId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Chats',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Participants');
  },
};
