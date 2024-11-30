require('dotenv').config();

function logAction(ctx, next) {
  if (process.env.NODE_ENV !== 'production') {
    console.log({ from: ctx.from, chat: ctx.chat, message: ctx.message });
  }

  if (ctx.from.id === ctx.chat.id) {
    console.log(
      ctx.from.id,
      'to BOT # MSG:',
      ctx.message.message_id,
      '# TXT:',
      ctx.message.text,
    );
  } else {
    console.log(
      ctx.from.id,
      'to CHAT:',
      ctx.chat.id,
      '# MSG:',
      ctx.message.message_id,
      '# TXT:',
      ctx.message.text,
    );
  }

  next();
}

module.exports = logAction;
