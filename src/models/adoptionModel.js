const pool = require('../config/db');

class AdoptionModel {
  static async findAll() {
    const query = `
      SELECT 
        a.id AS adoption_id,
        a.adoption_date,
        u.id AS user_id,
        u.name AS user_name,
        u.email AS user_email,
        p.id AS pet_id,
        p.name AS pet_name,
        p.species AS pet_species
      FROM adoptions a
      INNER JOIN users u ON a.user_id = u.id
      INNER JOIN pets p ON a.pet_id = p.id
    `;
    const [rows] = await pool.query(query);
    return rows;
  }

  static async findExistingAdoption(userId, petId) {
    const [rows] = await pool.query(
      'SELECT * FROM adoptions WHERE user_id = ? AND pet_id = ?',
      [userId, petId]
    );
    return rows[0];
  }

  static async create(userId, petId) {
    const connection = await pool.getConnection();
    try {
      await connection.beginTransaction();

      const adoptionDate = new Date();

      const [adoptionResult] = await connection.query(
        'INSERT INTO adoptions (user_id, pet_id, adoption_date) VALUES (?, ?, ?)',
        [userId, petId, adoptionDate]
      );

      await connection.query(
        'UPDATE pets SET status = "adopted" WHERE id = ?',
        [petId]
      );

      // Confirma as duas alterações no banco
      await connection.commit();
      return adoptionResult.insertId;
    } catch (error) {
      // Desfaz tudo se houver qualquer erro
      await connection.rollback();
      throw error;
    } finally {
      // Libera a conexão de volta para o pool
      connection.release();
    }
  }
}

module.exports = AdoptionModel;
