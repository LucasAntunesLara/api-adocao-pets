const db = require('../config/db')

class PetModel {
  static async create(petData) {
    const {name, age, species, size, status, description} = petData

    const [result] = await db.query(
      'INSERT INTO pets (name, age, species, size, status, description) VALUES (?, ?, ?, ?, "available", ?)',
      [name, age, species, size, status, description],
    )

    return result.insertId
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM pets WHERE id = ?', [id])

    return rows[0]
  }

  static async findAvailable() {
    const [rows] = await db.query(
      'SELECT * FROM pets WHERE status = "available"',
    )

    return rows
  }

  static async findAll() {
    const [rows] = await db.query('SELECT * FROM pets')

    return rows
  }

  static async update(id, petData) {
    const {name, age, species, size, status, description} = petData

    const [result] = await db.query(
      'UPDATE pets SET name = ?, age = ?, species = ?, size = ?, status = ?, description = ? WHERE id = ?',
      [name, age, species, size, status, description, id],
    )

    return result.affectedRows
  }

  static async deletePet(id) {
    const [result] = await db.query('DELETE FROM pets WHERE id = ?', [id])
    return result.affectedRows
  }
}

module.exports = PetModel
