const { Participant, Shuffling, Wish } = require('../../db/models');
const createUsername = require('../utils/createUsername');

class ShufflingService {
  constructor() {
    this.hasToHaveWishes = true;
  }

  async createShuffling() {
    const participants = await Participant.findAll({
      include: {
        model: Wish,
        as: 'wishes',
      },
    });
    const filteredParticipants = participants.filter((p) =>
      this.hasToHaveWishes ? p.wishes.length > 0 : true,
    );
    
  }
}

const shufflingService = new ShufflingService();

module.exports = shufflingService;
