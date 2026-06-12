const express = require('express')

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const petRoutes = require('./routes/petRoutes')

const app = express()

app.use(express.json())
app.use('/', authRoutes)
app.use('/users', userRoutes)
app.use('/pets', petRoutes)

module.exports = app
