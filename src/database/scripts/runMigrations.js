/* eslint-disable no-undef */
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const {getConnection} = require('../../config/db')

async function runMigrations() {
  const connection = await getConnection({useDatabase: false})

  try {
    const scriptPath = path.join(__dirname, '../create_tables.sql')
    const sqlScript = fs.readFileSync(scriptPath, 'utf8')

    console.log(
      '=============Executando script SQL de migração...=============',
    )

    await connection.query(sqlScript)

    console.log(
      '=============Banco e tabelas criados/atualizados com sucesso!=============',
    )
  } catch (error) {
    console.error('Erro ao criar tabelas:', error)
  } finally {
    await connection.end()
  }
}
module.exports = {
  runMigrations,
}
