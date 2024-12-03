const shufflingService = require('../services/shufflingService');
const wishService = require('../services/wishService');
const isAdmin = require('../utils/isAdmin');
require('dotenv').config();

class BotAction {
  constructor() {
    this.emojis = {
      accepted: '✅',
      awaiting: '⚠️',
      notStarted: '❌',
    };
  }

  #pickEmoji(participant) {
    if (!participant.hasStartedBot) return this.emojis.notStarted;
    if (!participant.shufflingFrom[0] || !participant.shufflingFrom[0].accepted)
      return this.emojis.awaiting;
    return this.emojis.accepted;
  }

  async #sendWishes(wishes, ctx) {
    const sentWishes = await Promise.allSettled(
      wishes.map((wish) => ctx.sendVideoNote(wish.telegramFileId)),
    );
    if (sentWishes.find((w) => w.status === 'rejected')) {
      ctx.reply(
        'Возникла ошибка с отправкой некоторых видео. Попробуй ещё раз или обратись к админу',
      );
    }
  }

  async showParticipantsList(ctx) {
    try {
      const participants = await wishService.getParticipants();
      const list = participants
        .map((p) => `${this.#pickEmoji(p)} ${p.telegramUsername}`)
        .join('\n');
      const info = `${this.emojis.accepted} - участник узнал своего подопечного\n${this.emojis.awaiting} - участник запустил бота, но ещё не узнал подопечного\n${this.emojis.notStarted} - участник ещё не запустил бота\n\n`;
      ctx.reply(info + list);
    } catch (error) {
      console.log(error);
      ctx.reply(`Возникла непредвиденная ошибка: ${error.message}`);
    }
  }

  async showMyReceiver(ctx) {
    try {
      const { data: receiverWishes, reason } = await wishService.getReceiverWishes(
        ctx.from.id,
      );
      switch (reason) {
        case wishService.receiverCodes.noShufflings:
          return ctx.reply('Подопечные ещё не были распределены');
        case wishService.receiverCodes.noWishesRecorded:
          return ctx.reply('Твой подопечный ещё не записал пожеланий');
        case wishService.receiverCodes.noUserFound:
          return ctx.reply('Участник не был найден. Обратись к администратору');
        default:
          break;
      }

      await this.#sendWishes(receiverWishes, ctx);
    } catch (error) {
      console.log(error);
      ctx.reply(`Возникла непредвиденная ошибка: ${error.message}. Обратись к админу.`);
    }
  }

  async displayMyWishes(ctx) {
    try {
      const myWishes = await wishService.getParticipantWishes(ctx.from.id);
      if (myWishes.length === 0)
        return ctx.reply('У тебя не записано ни одного пожелания');
      await this.#sendWishes(myWishes, ctx);
    } catch (error) {
      console.log(error);
      ctx.reply(`Возникла непредвиденная ошибка: ${error.message}. Обратись к админу.`);
    }
  }

  async shuffleParticipants(ctx) {
    if (!isAdmin(ctx.from.id)) return ctx.reply('Только админ может это сделать.');
    await shufflingService.createShuffling();
    const shuffledParticipants = await shufflingService.getParticipantsShufflings();
    const list = shuffledParticipants
      .map(
        (p) =>
          `${p.id}.${p.telegramUsername} -> ${p.shufflingFrom[0].toParticipant.id}.${p.shufflingFrom[0].toParticipant.telegramUsername}`,
      )
      .join('\n');
    ctx.reply(list);
  }

  async deleteUserWishes(ctx) {
    
  }

  async deleteAllWishes(ctx) {
    if (!isAdmin(ctx.from.id)) return ctx.reply('Только админ может это сделать.');
    await wishService.deleteAllWishes();
    ctx.reply('Все пожелания удалены');
  }
}

const botAction = new BotAction();

module.exports = botAction;
