const UserService = require('../services/userService')

class UserController {
  // eslint-disable-next-line no-unused-vars
  static async create(req, reqRes, next) {
    try {
      const {name, email, password, phone, role} = req.body

      if (!name || !email || !password || !phone)
        return reqRes.status(400).json({
          message: 'Todos os campos obrigatórios devem ser preenchidos.',
        })

      const newUser = await UserService.register({
        name,
        email,
        password,
        phone,
        role,
      })

      return reqRes.status(201).json({
        message: 'Usuário cadastrado com sucesso!',
        user: newUser,
      })
    } catch (error) {
      return reqRes.status(error.status || 500).json({message: error.message})
    }
  }

  static async findAll(req, res) {
    try {
      const users = await UserService.findAll(req.user)
      return res.json(users)
    } catch (error) {
      return res.status(error.status || 500).json({message: error.message})
    }
  }

  static async findById(req, res) {
    try {
      const id = Number(req.params.id)
      const user = await UserService.findById(id, req.user)
      return res.json(user)
    } catch (error) {
      return res.status(error.status || 404).json({message: error.message})
    }
  }

  static async update(req, res) {
    try {
      const id = Number(req.params.id)
      const {name, phone} = req.body

      if (!name && !phone)
        return res
          .status(400)
          .json({
            message: 'Pelo menos um campo deve ser informado para atualização.',
          })

      await UserService.update(id, {name, phone}, req.user)
      return res.json({message: 'Usuário atualizado com sucesso.'})
    } catch (error) {
      return res.status(error.status || 400).json({message: error.message})
    }
  }

  static async delete(req, res) {
    try {
      const id = Number(req.params.id)
      await UserService.deleteUser(id, req.user)
      return res.json({message: 'Usuário removido com sucesso.'})
    } catch (error) {
      return res.status(error.status || 500).json({message: error.message})
    }
  }
}

module.exports = UserController
