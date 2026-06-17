const PetModel = require('../models/petModel');

class PetService {
  static async getAvailablePets() {
    return await PetModel.findAvailable();
  }

  static async getAllPets() {
    return await PetModel.findAll();
  }

  static async getPetById(id) {
    const pet = await PetModel.findById(id);
    if (!pet) throw new Error('Pet não encontrado.');

    return pet;
  }

  static async createPet(pet) {
    return await PetModel.create(pet);
  }

  static async updatePet(id, pet) {
    const petExists = await PetModel.findById(id);
    if (!petExists) {
      const error = new Error('Pet não encontrado.');
      error.status = 404;
      throw error;
    }

    const updatedRows = await PetModel.update(id, pet);
    if (updatedRows === 0) {
      const err = new Error('Pet não encontrado.');
      err.status = 404;
      throw err;
    }

    return updatedRows;
  }

  static async deletePet(id) {
    const pet = await PetModel.findById(id);

    if (pet && pet.status === 'adopted') {
      const error = new Error(
        'Não é permitido remover um pet que já foi adotado.'
      );
      error.status = 400;
      throw error;
    }

    const deletedRows = await PetModel.deletePet(id);
    if (deletedRows === 0) {
      const error = new Error('Pet não encontrado.');
      error.status = 404;
      throw error;
    }

    return deletedRows;
  }
}
module.exports = PetService;
