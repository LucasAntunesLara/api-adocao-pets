const AdoptionService = require('../services/adoptionService');

class AdoptionController {
  static async getAll(req, res) {
    try {
      const adoptions = await AdoptionService.getAllAdoptions(req.user);
      res.json(adoptions);
    } catch (error) {
      res.status(error.status || 500).json({ error: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { petId } = req.body;

      if (!petId)
        return res
          .status(400)
          .json({ error: 'Você deve informar o id do pet.' });

      const result = await AdoptionService.createAdoption(
        Number(petId),
        req.user
      );

      return res.status(201).json(result);
    } catch (error) {
      res.status(error.status || 400).json({ error: error.message });
    }
  }
}
module.exports = AdoptionController;
