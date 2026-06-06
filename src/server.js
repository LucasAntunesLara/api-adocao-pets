require('dotenv').config()

const express = require('express')

const app = express()

// eslint-disable-next-line no-undef
const PORT = process.env.PORT

app.use(express.json())

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`)
})
