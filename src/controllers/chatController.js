const chatService = require('../services/chatService');
const wishService = require('../services/wishService');
const generateSecondVideoResponse = require('../utils/generateSecondVideoResponse');
const generateVideoResponse = require('../utils/generateVideoResponse');

class ChatController {
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
    };
    this.wrongChatMessage = 'Привет! Я работаю только в группе Эльбруса.';
  }

  onMessage = async (ctx) => {
    // Сообщение в чате, а не лично боту
    // const elbrusChatGroupId = Number(process.env.ELBRUS_SECRET_SANTA_GROUP_ID);
    // Проверка, что это требуемый чат Эльбруса, а не произвольный
    const targetChat = await chatService.isValidChat(ctx.chat.id);
    if (!targetChat) {
      return ctx.reply(this.wrongChatMessage);
    }
    if (!ctx.message || !ctx.message.video_note) {
      return undefined;
    }

    const [username, wishesLength] = await wishService.createWish(ctx);

    if (wishesLength === 1) {
      ctx.reply(generateVideoResponse(username));
    } else if (wishesLength <= wishService.MAX_WISHES) {
      ctx.reply(generateSecondVideoResponse(username));
    } else {
      ctx.reply(
        `Больше пяти пожеланий записать нельзя! Новое пожелание пользователя ${username} было сохранено, а самое давнее было удалено.`,
      );
    }
  };
}

const chatController = new ChatController();

module.exports = chatController;
