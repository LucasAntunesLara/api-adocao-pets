/* eslint-disable no-unused-vars */
const dotenv = require('dotenv').config()
// eslint-disable-next-line no-undef
const ENV = process.env

const mysql = require('mysql2')
const connection = mysql.createConnection({
  host: ENV.DB_HOST,
  user: ENV.DB_USER,
  password: ENV.DB_PASSWORD,
  database: ENV.DB_NAME,
})

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar:', err)
    return
  }

  console.log('Conectado ao banco de dados com sucesso!')
})
module.exports = connection
