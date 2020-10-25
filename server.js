const express = require('express')
const path = require('path')
const http = require('http')

const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'app')))
app.set('views', path.join(__dirname, 'app'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) => {
    res.render('index.html')
})

let messages = []

io.on('connection', socket => {
    console.log(`${socket.id} is connected`);

    socket.emit('previous_message', messages)

    socket.on('send_message', data => {
        messages.push(data)
        socket.broadcast.emit('received_message', data)
    })
})

server.listen('3000')