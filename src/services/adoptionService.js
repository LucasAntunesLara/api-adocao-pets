const AdoptionModel = require('../models/adoptionModel');
const PetModel = require('../models/petModel');

class AdoptionService {
  static async getAllAdoptions() {
    return await AdoptionModel.findAll();
  }

  static async createAdoption(petId, user) {
    const pet = await PetModel.findById(petId);
    if (!pet) {
      const error = new Error('O pet informado não existe.');
      error.status = 404;
      throw error;
    }

    if (pet.status !== 'available') {
      const error = new Error(
        'Este pet não está disponível para adoção (já foi adotado).'
      );
      error.status = 400;
      throw error;
    }

    const alreadyAdopted = await AdoptionModel.findExistingAdoption(
      user.userId,
      petId
    );

    if (alreadyAdopted) {
      const error = new Error('Você já adotou este pet anteriormente.');
      error.status = 400;
      throw error;
    }

    const adoptionId = await AdoptionModel.create(user.userId, petId);

    return {
      id: adoptionId,
      userId: user.userId,
      petId,
      message: 'Adoção concluída com sucesso!',
    };
  }
}
module.exports = AdoptionService;
