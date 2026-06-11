require('dotenv').config()
const app = require('./src/app')
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
