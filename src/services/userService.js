const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');

class UserService {
  static async register(userData) {
    const {name, email, password, phone, role} = userData;

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
}

module.exports = UserService;
