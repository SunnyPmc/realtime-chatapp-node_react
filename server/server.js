const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const http = require('http')
const {Server} = require('socket.io')

const port = process.env.PORT || 8000

const app = express()
app.use(cors())
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on("connection", (socket) => {
    console.log(`User is Connected: ${socket.id}`)

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with id : ${socket.id} joined the room: ${data}`)
    });
    
    socket.on("send_message", (data) => {
        socket.to(data.chatRoom).emit("receive_message", data)
    });
    
    socket.on("disconnect", () => {
        console.log("User is disconnected", socket.id)
    })
})


server.listen(port, () => console.log(`Server running on port ${port}`))