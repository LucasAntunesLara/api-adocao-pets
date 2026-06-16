/* eslint-disable no-undef */
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const {getConnection} = require('../../config/db')

async function seedMigrations() {
  const connection = await getConnection({useDatabase: false})

  try {
    const scriptPath = path.join(__dirname, '../seed_tables.sql')
    const sqlScript = fs.readFileSync(scriptPath, 'utf8')

    console.log('=============Executando script SQL de seed...=============')

    await connection.query(sqlScript)

    console.log('=============Tabelas povoadas com sucesso!=============')
  } catch (error) {
    console.error('Erro ao criar tabelas:', error)
  } finally {
    await connection.end()
  }
}
module.exports = {
  seedMigrations,
}
