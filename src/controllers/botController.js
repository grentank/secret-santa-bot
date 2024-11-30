const { Markup } = require('telegraf');
const wishService = require('../services/wishService');

class BotController {
  constructor() {
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
      deleteWish: 'Удалить моё пожелание',
    };
    this.wrongChatMessage = 'Привет! Я работаю только в группе Эльбруса.';
  }

  get keyboard() {
    return Markup.keyboard(
      Object.values(this.buttons).map((text) => Markup.button.text(text)),
    );
  }

  start = (ctx) => {
    // команда start должна быть доступна только в диалоге с ботом
    if (ctx.from.id === ctx.chat.id) {
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
        ctx.reply('Вот пожелание твоего подопечного:');
        break;
      case this.buttons.getList:
        ctx.reply('Вот список участников:');
        break;
      case this.buttons.viewWish:
        this.displayMiWishes(ctx);
        break;
      case this.buttons.deleteWish:
        ctx.reply('Ты уверен? Тут будет вопрос на инлайновой клавиатуре');
        break;
      default:
        break;
    }
  };

  async displayMiWishes(ctx) {
    const myWishes = await wishService.getParticipantWishes(ctx.from.id);
    const sentWishes = await Promise.allSettled(
      myWishes.map((wish) => ctx.sendVideoNote(wish.telegramFileId)),
    );
    if (sentWishes.find((w) => w.status === 'rejected')) {
      ctx.reply(
        'Возникла ошибка с отправкой некоторых видео. Попробуй ещё раз или обратись к админу',
      );
    }
  }
}

const botController = new BotController();

module.exports = botController;
