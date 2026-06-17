const authService = require('../services/authService');

class AuthController {
  static async login(req, res) {
    try {
      const { email, password } = req.body;

      if (!email || !password)
        return res
          .status(400)
          .json({ message: 'Preencha todos os campos obrigatórios.' });

      const tokenData = await authService.authenticate(email, password);

      return res.status(200).json({
        message: 'Login realizado com sucesso!',
        token: tokenData.token,
      });
    } catch (error) {
      return res.status(error.status || 401).json({ message: error.message });
    }
  }
}

module.exports = AuthController;
