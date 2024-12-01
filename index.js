const { Telegraf } = require('telegraf');
const logAction = require('./src/utils/logAction');
const botController = require('./src/controllers/botController');
const chatController = require('./src/controllers/chatController');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.use(logAction);
bot.start(botController.start);
bot.help(botController.help);
bot.on('message', (ctx) => {
  if (ctx.from.id === ctx.chat.id) {
    botController.command(ctx);
  } else {
    chatController.onMessage(ctx);
  }
});

bot
  .launch(() => console.log('Бот запущен'))
  .catch((err) => console.log('Ошибка запуска бота', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
