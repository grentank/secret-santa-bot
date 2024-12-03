const { Participant, Shuffling, Wish } = require('../../db/models');
const createRandomPermutation = require('../utils/createRandomPermutation');

class ShufflingService {
  constructor() {
    this.hasToHaveWishes = true;
  }

  async createShuffling() {
    const participants = await Participant.findAll({
      include: {
        model: Wish,
        as: 'wishes',
        required: true,
      },
    });
    const permutation = createRandomPermutation(participants.length);
    return Shuffling.bulkCreate(
      participants.map((participant, index) => ({
        fromParticipantId: participant.id,
        toParticipantId: participants[permutation[index]].id,
        accepted: false,
      })),
    );
  }

  getParticipantsShufflings() {
    return Participant.findAll({
      include: {
        model: Shuffling,
        as: 'shufflingFrom',
        required: true,
        include: {
          model: Participant,
          as: 'toParticipant',
        },
      },
    });
  }
}

const shufflingService = new ShufflingService();

module.exports = shufflingService;
