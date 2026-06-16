// const connection = require('../../config/db')

const drop = require('./dropDatabase')
const migrations = require('./runMigrations')
const seeder = require('./seedMigrations')

;(async () => {
  try {
    console.log(
      '=============Deletando banco de dados **pets_db**...=============',
    )
    await drop.dropDatabase()

    console.log(
      '=============Executando script SQL de migração...=============',
    )
    await migrations.runMigrations()

    console.log('=============Executando script SQL de seed...=============')
    await seeder.seedMigrations()

    console.log('=============Refresh completo!=============')
  } catch (err) {
    console.error('Erro durante refresh do banco:', err)
    process.exitCode = 1
  }
})()
