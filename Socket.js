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

const users = {}; 


function getRecieverSocketId(receiverId) {
  return users[receiverId];
}

io.on('connection', (socket) => {
  console.log("connected", socket.id);

  const userId = socket.handshake.query.userId; 
  if (userId) {
    console.log(`User connected: ${userId}`);
    users[userId] = socket.id; 
 
    io.emit("getOnline",Object.keys(users));
  }

  socket.on('disconnect', () => {
    delete users[userId]; 
    console.log(`User disconnected: ${userId}`);
    io.emit("getOnline",Object.keys(users));
  });

  // Handle typing event
  socket.on("typing", (room, sender) => {

    io.to(users[room._id]).emit('typing', sender); 
  });

  // Handle stop-typing event
  socket.on("stop-typing", (room) => {

    io.to(users[room._id]).emit('stop-typing'); 
  });
});

module.exports = { server, app, getRecieverSocketId, io };
