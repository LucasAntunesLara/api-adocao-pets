const PetModel = require('../models/petModel')

class PetService {
  static async getAvailablePets() {
    return await PetModel.findAvailable()
  }

  static async getAllPets() {
    return await PetModel.findAll()
  }

  //Apenas usuários com perfil "admin" podem cadastrar, atualizar ou remover pets
  /** Adicionar posteriormente a lógica que realmente garante isso. */
  static async createPet(pet) {
    return await PetModel.create(pet)
  }

  static async updatePet(id, pet) {
    const updatedRows = await PetModel.update(id, pet)
    if (updatedRows === 0) throw new Error('Pet não encontrado.')

    return updatedRows
  }

  static async deletePet(id) {
    const deletedRows = await PetModel.delete(id)
    if (deletedRows === 0) throw new Error('Pet não encontrado.')

    return deletedRows
  }
}
module.exports = PetService
