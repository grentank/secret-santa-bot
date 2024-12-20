const { Markup } = require('telegraf');
const wishService = require('../services/wishService');
const botAction = require('../actions/botAction');

class BotController {
  constructor(action) {
    this.startMessage =
      'Приветствую в меню бота! Тут ты можешь узнать своего подопечного и посмотреть список участников';
    this.helpMessages = {
      bot: 'Введи /start, чтобы увидеть меню',
      chat: 'Запиши кружочек со своим пожеланием, а я его сохраню в базу данных',
    };
    this.buttons = {
      getList: 'Посмотреть список',
      viewWish: 'Показать моё пожелание',
      openReceiver: 'Узнать подопечного',
        deleteWish: 'Прекратить участие',
    };
    this.wrongChatMessage = 'Привет! Я работаю только в группе Эльбруса.';
    this.shuffleCommand = 'перемешай участников';
    this.action = action;
  }

  get keyboard() {
    return Markup.keyboard(
      Object.values(this.buttons).map((text) => Markup.button.text(text)),
    );
  }

  start = (ctx) => {
    // команда start должна быть доступна только в диалоге с ботом
    if (ctx.from.id === ctx.chat.id) {
      wishService.hasStartedBot(ctx).catch((err) => {
        console.log(err);
        ctx.reply(`Возникла ошибка при старте бота: ${err.message}`);
      });
      ctx.reply(this.startMessage, this.keyboard);
    }
  };

  help = (ctx) => {
    if (ctx.from.id === ctx.chat.id) {
      ctx.reply(this.helpMessages.bot);
    } else if (Number(process.env.ELBRUS_SECRET_SANTA_GROUP_ID) === ctx.chat.id) {
      ctx.reply(this.helpMessages.chat);
    } else {
      ctx.reply(this.wrongChatMessage);
    }
  };

  command = (ctx) => {
    switch (ctx.message.text) {
      case this.buttons.openReceiver:
        this.action.showMyReceiver(ctx);
        break;
      case this.buttons.getList:
        this.action.showParticipantsList(ctx);
        break;
      case this.buttons.viewWish:
        this.action.displayMyWishes(ctx);
        break;
      case this.buttons.deleteWish:
        ctx.reply('Ты уверен? (пока это сделать нельзя)');
        break;
      case this.shuffleCommand:
        this.action.shuffleParticipants(ctx);
        break;
      default:
        break;
    }
  };

  // #pickEmoji(participant) {
  //   if (!participant.hasStartedBot) return this.emojis.notStarted;
  //   if (!participant.shufflingFrom[0] || !participant.shufflingFrom[0].accepted)
  //     return this.emojis.awaiting;
  //   return this.emojis.accepted;
  // }

  // async #sendWishes(wishes, ctx) {
  //   const sentWishes = await Promise.allSettled(
  //     wishes.map((wish) => ctx.sendVideoNote(wish.telegramFileId)),
  //   );
  //   if (sentWishes.find((w) => w.status === 'rejected')) {
  //     ctx.reply(
  //       'Возникла ошибка с отправкой некоторых видео. Попробуй ещё раз или обратись к админу',
  //     );
  //   }
  // }

  // async showParticipantsList(ctx) {
  //   try {
  //     const participants = await wishService.getParticipants();
  //     const list = participants
  //       .map((p) => `${this.#pickEmoji(p)} ${p.telegramUsername}`)
  //       .join('\n');
  //     const info = `${this.emojis.accepted} - участник узнал своего подопечного\n${this.emojis.awaiting} - участник запустил бота, но ещё не узнал подопечного\n${this.emojis.notStarted} - участник ещё не запустил бота\n\n`;
  //     ctx.reply(info + list);
  //   } catch (error) {
  //     console.log(error);
  //     ctx.reply(`Возникла непредвиденная ошибка: ${error.message}`);
  //   }
  // }

  // async showMyReceiver(ctx) {
  //   try {
  //     const { data: receiverWishes, reason } = await wishService.getReceiverWishes(
  //       ctx.from.id,
  //     );
  //     switch (reason) {
  //       case wishService.receiverCodes.noShufflings:
  //         return ctx.reply('Подопечные ещё не были распределены');
  //       case wishService.receiverCodes.noWishesRecorded:
  //         return ctx.reply('Твой подопечный ещё не записал пожеланий');
  //       case wishService.receiverCodes.noUserFound:
  //         return ctx.reply('Участник не был найден. Обратись к администратору');
  //       default:
  //         break;
  //     }

  //     await this.#sendWishes(receiverWishes, ctx);
  //   } catch (error) {
  //     console.log(error);
  //     ctx.reply(`Возникла непредвиденная ошибка: ${error.message}. Обратись к админу.`);
  //   }
  // }

  // async displayMiWishes(ctx) {
  //   try {
  //     const myWishes = await wishService.getParticipantWishes(ctx.from.id);
  //     if (myWishes.length === 0)
  //       return ctx.reply('У тебя не записано ни одного пожелания');
  //     await this.#sendWishes(myWishes);
  //   } catch (error) {
  //     console.log(error);
  //     ctx.reply(`Возникла непредвиденная ошибка: ${error.message}. Обратись к админу.`);
  //   }
  // }
}

const botController = new BotController(botAction);

module.exports = botController;
