const express = require('express')
const connectDB = require('./config/db')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const bike = require('./routes/bike-routes')
const rent = require('./routes/rent-routes')

const server = express()
connectDB()

server.use(cors())
server.use(morgan('dev'))

server.use(express.json({ extended: false }))
server.get('/', (req, res) => res.send('API Running'))

server.use('/bike', bike )
server.use('/rent', rent )

const PORT = process.env.PORT || 5000


server.listen(PORT, () => console.log(`Server started on port ${PORT}`))
