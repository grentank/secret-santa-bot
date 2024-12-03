const { Participant, Shuffling, Wish, Chat } = require('../../db/models');
const createUsername = require('../utils/createUsername');

class WishService {
  constructor() {
    this.MAX_WISHES = 5;
    this.receiverCodes = {
      noShufflings: 'noShufflings',
      noUserFound: 'noUserFound',
      userNotActivated: 'userNotActivated',
      noWishesRecorded: 'noWishesRecorded',
    };
  }

  async hasStartedBot(ctx) {
    const username = createUsername(ctx.from);
    const [targetParticipant] = await Participant.findOrCreate({
      where: {
        telegramUserId: ctx.from.id,
      },
      defaults: {
        telegramUsername: username,
        hasStartedBot: true,
      },
    });
    targetParticipant.hasStartedBot = true;
    return targetParticipant.save();
  }

  async createWish(ctx) {
    const username = createUsername(ctx.from);
    const targetChat = await Chat.findOne({
      where: {
        telegramChatId: ctx.chat.id,
      },
    });

    const [participant, created] = await Participant.findOrCreate({
      where: {
        telegramUserId: ctx.from.id,
        chatId: targetChat.id,
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

    // if (participant.id === 9) {
    //   await Shuffling.create({
    //     fromParticipantId: 1,
    //     toParticipantId: 9,
    //     accepted: false,
    //   });
    // }

    return [username, wishesLength];
  }

  async getReceiverWishes(telegramUserId) {
    const fromParticipant = await Participant.findOne({
      where: {
        telegramUserId,
      },
      include: {
        model: Shuffling,
        as: 'shufflingFrom',
      },
    });
    if (fromParticipant.shufflingFrom.length === 0) {
      return { data: null, reason: this.receiverCodes.noShufflings };
    }
    const targetShuffling = fromParticipant.shufflingFrom[0];
    const receiver = await Participant.findOne({
      where: {
        id: targetShuffling.toParticipantId,
      },
      include: {
        model: Wish,
        as: 'wishes',
      },
    });
    if (!receiver) {
      return { data: null, reason: this.receiverCodes.noUserFound };
    }
    if (receiver.wishes.length === 0) {
      return { data: null, reason: this.receiverCodes.noWishesRecorded };
    }
    targetShuffling.accepted = true;
    await targetShuffling.save();
    return { data: receiver.wishes };
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
    return participant?.wishes;
  }

  getParticipants() {
    return Participant.findAll({
      include: [
        {
          model: Wish,
          as: 'wishes',
          required: true,
        },
        {
          model: Shuffling,
          as: 'shufflingFrom',
        },
      ],
    });
  }
}

const wishService = new WishService();

module.exports = wishService;
