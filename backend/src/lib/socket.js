import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
        credentials: true,
    },
});

export function getReciversSocketId (userId) {
    return userSocketMap[userId];
}

// to store online users
const userSocketMap = {} // {userId: socketId}

// let's listen for any incoming connections
io.on("connection", (socket) => {
    console.log("user connected", socket.id);

    // get the userId
    const userId = socket.handshake.query.userId
    if (userId) userSocketMap[userId] = socket.id

    // io.emit() is used to tell every users who's currently online 
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    });
});

export { app, server, io };
