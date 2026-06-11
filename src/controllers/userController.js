const UserService = require('../services/userService');

class UserController {
  // eslint-disable-next-line no-unused-vars
  static async create(req, reqRes, next) {
    try {
      const {name, email, password, phone, role} = req.body;

      if (!name || !email || !password || !phone)
        return reqRes.status(400).json({
          message: 'Todos os campos obrigatórios devem ser preenchidos.',
        });

      const newUser = await UserService.register({
        name,
        email,
        password,
        phone,
        role,
      });

      return reqRes.status(201).json({
        message: 'Usuário cadastrado com sucesso!',
        user: newUser,
      });
    } catch (error) {
      return reqRes.status(error.status || 500).json({message: error.message});
    }
  }

  //Adicionar outros métodos (findAll, findById, update, delete) posteriormente
}

module.exports = UserController;
