const PetService = require('../services/petService')

class PetController {
  static async getAvailable(req, res) {
    try {
      const pets = await PetService.getAvailablePets()
      res.json(pets)
    } catch (error) {
      res.status(500).json({error: error.message})
    }
  }

  static async getAll(req, res) {
    try {
      const pets = await PetService.getAllPets(req.user)
      res.json(pets)
    } catch (error) {
      res.status(error.status || 500).json({error: error.message})
    }
  }

  static async getById(req, res) {
    try {
      const id = req.params.id
      const pet = await PetService.getPetById(id)
      res.json(pet)
    } catch (error) {
      res.status(error.status || 404).json({error: error.message})
    }
  }

  static async create(req, res) {
    try {
      const id = await PetService.createPet(req.body, req.user)
      res.status(201).json({message: 'Pet criado com sucesso.', id})
    } catch (error) {
      res.status(error.status || 400).json({error: error.message})
    }
  }

  static async update(req, res) {
    try {
      const id = req.params.id
      await PetService.updatePet(id, req.body, req.user)
      res.json({message: 'Pet atualizado com sucesso.'})
    } catch (error) {
      res.status(error.status || 400).json({error: error.message})
    }
  }

  static async delete(req, res) {
    try {
      const id = req.params.id
      await PetService.deletePet(id, req.user)
      res.json({message: 'Pet deletado com sucesso.'})
    } catch (error) {
      res.status(error.status || 500).json({error: error.message})
    }
  }
}
module.exports = PetController
