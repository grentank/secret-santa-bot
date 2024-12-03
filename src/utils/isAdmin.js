require('dotenv').config();

function isAdmin(telegramId) {
  return telegramId === Number(process.env.BOT_ADMIN_USER_ID);
}

module.exports = isAdmin;
