const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const cors = require('cors')

const app = express()
const PORT = config.get('port')

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/api/auth.routes'))
app.use('/api/lists', require('./routes/api/list.routes'))
app.use('/api/images', require('./routes/api/image.routes'))

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {useNewUrlParser: true, useUnifiedTopology: true})
        app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`))
    } catch (error) {
        console.log(`Server error: ${error}`)
        process.exit(1)
    }
}

start()