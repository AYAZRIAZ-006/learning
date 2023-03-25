import express from "express";
import cors from "cors";
const app = express()
import http from "http";
import { Server } from "socket.io";

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

//////////// when user connect  ////////////
io.on("connection", (socket) => {
    console.log("userId", socket.id);
    //////////// join room  ////////////
    socket.on("join_room", (room) => {
        socket.join(room);
        console.log(`user id: ${socket.id} join room: ${room}`);
    });

    //////////// send message  ////////////

    socket.on("send_message", (message) => {
        // console.log("send_message", message);
        socket.to(message.room).emit("receive_message", message);
    })

    //////////// when user disconnect  ////////////
    socket.on("disconnect", () => {
        console.log("user disconnect", socket.id);
    });
});

server.listen(3001, () => {
    console.log("server is running");
})