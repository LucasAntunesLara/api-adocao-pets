const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');

class AuthService {
  static async authenticate(email, password) {
    const user = await UserModel.findByEmail(email);

    if (!user) {
      const error = new Error('Email ou senha incorretos.');
      error.status = 401;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      const error = new Error('Email ou senha incorretos.');
      error.status = 401;
      throw error;
    }

    const payload = {
      userId: user.id,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return { token };
  }
}

module.exports = AuthService;
