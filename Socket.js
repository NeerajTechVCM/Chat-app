const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ['GET', 'POST']
  }
});

const users = {}; // Store users and their socket ids

function getRecieverSocketId(receiverId) {
  return users[receiverId];
}

io.on('connection', (socket) => {
  console.log("connected", socket.id);

  const userId = socket.handshake.query.userId; // Get the user ID from the query string
  if (userId) {
    console.log(`User connected: ${userId}`);
    users[userId] = socket.id; // Map the userId to the socket.id
    io.emit("getOnline", Object.keys(users)); // Emit all online users
  }

  socket.on('disconnect', () => {
    delete users[userId]; // Remove the user from the users map on disconnect
    console.log(`User disconnected: ${userId}`);
    io.emit("getOnline", Object.keys(users)); // Emit updated list of online users
  });

  // Handle typing event
  socket.on("typing", (room, sender) => {
    console.log(`User ${sender} is typing in room: ${room._id}`);
    io.to(users[room._id]).emit('typing', sender); // Emit the typing event to the other user in the room
  });

  // Handle stop-typing event
  socket.on("stop-typing", (room) => {
    console.log(`User stopped typing in room: ${room._id}`);
    io.to(users[room._id]).emit('stop-typing'); // Notify the other user that typing has stopped
  });
});

module.exports = { server, app, getRecieverSocketId, io };
