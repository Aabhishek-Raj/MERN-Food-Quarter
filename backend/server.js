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
const allowedOrigins = require('./config/allowedOrigins')
const socketIO = require('socket.io');




connectDB() 

app.use(logger) 

app.use(cors(corsOptions)) 

app.use(express.json())

app.use(cookieParse())

app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/', require('./routes/root'))
app.use('/images', require('./controllers/imageController'))
app.use('/users', require('./routes/userRoutes'))
app.use('/admin', require('./routes/adminRoutes'))
app.use('/supplier', require('./routes/supplierRoutes'))
app.use('/food', require('./routes/foodRoutes'))
app.use('/chats', require('./routes/chatRoutes'))
app.use('/order', require('./routes/orderRoutes'))


// app.all('*', (req, res) => {
//     res.status(404)
//     if(req.accepts('html')){
//         res.sendFile(path.join(__dirname, 'views', '404.html'))
//     } else if(req.accepts('json')){
//         res.json({message: '404 Not found'}) 
//     }else{
//         res.type('txt').send('404 Not found')
//     }
// })

app.listen('*', () => {
    //send the index.html from buid folder
})

app.use(errorHandler)

const io = socketIO()


mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    const server = app.listen(PORT, () => {console.log(`Server running on port ${PORT}`)})

    io.attach(server, {
        pingTimeout: 6000,
        cors: {
            origin: allowedOrigins
        }
    })
})

io.on('connection', socket => {
    console.log(`New socket connection from ${socket.handshake.address}`)

    socket.on('setup', (userData) => {  
        socket.join(userData._id)

        socket.emit('connected')   
        console.log(`${userData.user?.username || userData.supplier?.name} connected`)
    })  

    socket.on('join chat', (room) => {       
        socket.join(room)
        console.log('User joined the Room ' + room)
    }) 
 
    socket.on('new message', (newMessageRecieved) => {    
        let chat = newMessageRecieved.chat 
        console.log(chat._id)

        if(!chat.user || !chat.supplier) return console.log('chat.users is not defined') 

            socket.in(chat._id ).emit('message recieved', newMessageRecieved)      

    })
})
  
mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
    
})