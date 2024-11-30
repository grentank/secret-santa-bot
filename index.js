const { Telegraf } = require('telegraf');
require('dotenv').config();
// Замените 'YOUR_BOT_TOKEN' на токен вашего Telegram-бота
const bot = new Telegraf(process.env.BOT_TOKEN);

// Обработчик сообщений
bot.on('message', (ctx) => {
  console.log({ from: ctx.from, chat: ctx.chat, message: ctx.message });
  const elbrusChatGroupId = Number(process.env.ELBRUS_SECRET_SANTA_GROUP_ID);
  if (elbrusChatGroupId !== ctx.chat.id) {
    return ctx.reply('Привет! Я работаю только в группе Эльбруса.');
  }
  // Проверяем, является ли сообщение видеосообщением (кружочком)
  if (ctx.message && ctx.message.video_note) {
    ctx.reply('Пожелание записано!');

    setTimeout(() => {
      // ctx.sendMessage('Тебе записали кружочек!', )
      const targetId =
        ctx.from.id === Number(process.env.BOT_ADMIN_USER_ID)
          ? process.env.BOT_OTHER_USER_ID
          : process.env.BOT_ADMIN_USER_ID;
      bot.telegram.sendMessage(targetId, '💕Для тебя записан кружочек!💕');
      bot.telegram.sendVideoNote(targetId, ctx.message.video_note.file_id);
    }, 5000);
  }
});

// Запуск бота
bot
  .launch()
  .then(() => console.log('Бот запущен'))
  .catch((err) => console.error('Ошибка запуска бота', err));

// Обработка остановки процесса
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
