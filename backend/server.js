require('dotenv').config()
const express = require('express')
const app = express()
const path = require('node:path')
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParse = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOption')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4000

connectDB()

app.use(logger) 

app.use(cors(corsOptions)) 

app.use(express.json())

app.use(cookieParse())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/users', require('./routes/userRoutes'))
app.use('/admin', require('./routes/adminRoutes'))
app.use('/supplier', require('./routes/supplierRoutes'))
app.use('/package', require('./routes/packageRoutes'))

app.all('*', (req, res) => {
    res.status(404)
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if(req.accepts('json')){
        res.json({message: '404 Not found'})
    }else{
        res.type('txt').send('404 Not found')
    }
})

app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
    
})
