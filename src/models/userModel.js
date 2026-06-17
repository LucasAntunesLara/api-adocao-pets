const pool = require('../config/db');

class UserModel {
  static async create(userData) {
    const { name, email, password, phone, role } = userData;

    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, phone, role]
    );

    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);

    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.query(
      'SELECT id, name, email, phone, role FROM users WHERE id = ?',
      [id]
    );

    return rows[0];
  }

  static async findAll() {
    const [rows] = await pool.query(
      'SELECT id, name, email, phone, role FROM users'
    );

    return rows;
  }

  static async update(id, { name, phone }) {
    await pool.query('UPDATE users SET name = ?, phone = ? WHERE id = ?', [
      name,
      phone,
      id,
    ]);
  }

  static async deleteUser(id) {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
  }
}

module.exports = UserModel;
