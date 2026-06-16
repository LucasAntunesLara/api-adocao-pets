/* eslint-disable no-undef */
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const {getConnection} = require('../connection')

async function dropDatabase() {
  const connection = await getConnection({useDatabase: false})

  try {
    const scriptPath = path.join(__dirname, '../drop_database.sql')
    const sqlScript = fs.readFileSync(scriptPath, 'utf8')

    console.log(
      '=============Deletando banco de dados **pets_db**...=============',
    )

    await connection.query(sqlScript)

    console.log('=============Banco deletado com sucesso!=============')
  } catch (error) {
    console.error('Erro ao deletar banco de dados:', error)
  } finally {
    await connection.end()
  }
}
module.exports = {
  dropDatabase,
}
