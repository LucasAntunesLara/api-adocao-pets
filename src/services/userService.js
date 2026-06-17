const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

class UserService {
  static async register(userData) {
    const { name, email, password, phone, role } = userData;

    const userExists = await userModel.findByEmail(email);

    if (userExists) {
      const error = new Error('E-mail já cadastrado.');
      error.status = 400;
      throw error;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const finalRole = role || 'adopter';

    const newUserId = await userModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role: finalRole,
    });

    return {
      id: newUserId,
      name,
      email,
      phone,
      role: finalRole,
    };
  }

  static async findAll() {
    return userModel.findAll();
  }

  static async findById(id, user) {
    if (!Number.isInteger(id) || id <= 0) {
      const error = new Error('ID inválido.');
      error.status = 400;
      throw error;
    }

    const existingUser = await userModel.findById(id);

    if (!existingUser) {
      const error = new Error('Usuário não encontrado.');
      error.status = 404;
      throw error;
    }

    if (user.role !== 'admin' && user.userId !== id) {
      const error = new Error('Acesso negado.');
      error.status = 403;
      throw error;
    }

    return existingUser;
  }

  static async update(id, updateData, user) {
    if (!Number.isInteger(id) || id <= 0) {
      const error = new Error('ID inválido.');
      error.status = 400;
      throw error;
    }

    const { name, phone } = updateData;

    if (!name && !phone) {
      const error = new Error(
        'Pelo menos um campo deve ser informado para atualização.'
      );
      error.status = 400;
      throw error;
    }

    const existingUser = await userModel.findById(id);

    if (!existingUser) {
      const error = new Error('Usuário não encontrado.');
      error.status = 404;
      throw error;
    }

    if (user.role !== 'admin' && user.userId !== id) {
      const error = new Error('Acesso negado.');
      error.status = 403;
      throw error;
    }

    const updatedName = name || existingUser.name;
    const updatedPhone = phone || existingUser.phone;

    await userModel.update(id, { name: updatedName, phone: updatedPhone });
  }

  static async deleteUser(id) {
    if (!Number.isInteger(id) || id <= 0) {
      const error = new Error('ID inválido.');
      error.status = 400;
      throw error;
    }
    const existingUser = await userModel.findById(id);

    if (!existingUser) {
      const error = new Error('Usuário não encontrado.');
      error.status = 404;
      throw error;
    }

    await userModel.deleteUser(id);
  }
}

module.exports = UserService;
