const { Participant, Shuffling, Wish } = require('../../db/models');

class WishService {
  constructor() {
    this.MAX_WISHES = 5;
  }

  async createWish(ctx) {
    const username =
      ctx.from.username || ctx.from.last_name
        ? `${ctx.from.first_name} ${ctx.from.last_name}`
        : ctx.from.first_name;

    const [participant, created] = await Participant.findOrCreate({
      where: {
        telegramUserId: ctx.from.id,
      },
      defaults: {
        telegramUsername: username,
        hasStartedBot: false,
      },
    });
    // Если вдруг username человека обновился после обновления профиля -- тоже обновляем
    if (!created && participant.telegramUsername !== username) {
      participant.telegramUsername = username;
    }
    await Wish.create({
      participantId: participant.id,
      telegramFileId: ctx.message.video_note.file_id,
    });
    const currentWishes = await Wish.findAll({
      where: {
        participantId: participant.id,
      },
      order: [['id', 'ASC']],
    });
    const wishesLength = currentWishes.length;
    if (wishesLength > this.MAX_WISHES) {
      await currentWishes[0].destroy();
    }

    return [username, wishesLength];
  }

  async getParticipantWishes(telegramUserId) {
    const participant = await Participant.findOne({
      where: {
        telegramUserId,
      },
      include: {
        model: Wish,
        as: 'wishes',
        order: [['id', 'ASC']],
      },
    });
    return participant.wishes;
  }
}

const wishService = new WishService();

module.exports = wishService;
