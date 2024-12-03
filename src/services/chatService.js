const { Participant, Shuffling, Wish, Chat } = require('../../db/models');

class ChatService {
  constructor() {
    this.hasToHaveWishes = true;
  }

  async isValidChat(chatId) {
    return Chat.findOne({
      where: {
        id: chatId,
      },
    });
  }
}

const chatService = new ChatService();

module.exports = chatService;
