const express = require('express');
const http = require('http');

const app = express();

const server = http.createServer(app);

const { Server } = require('socket.io');
const { v4 } = require('uuid');

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

const usersConnected = [];

io.on('connection', client => {
  client.on('user-connected', data => {
    if (usersConnected.includes(data.email)) return;

    usersConnected.push(data.email);
    console.log(usersConnected);
  });

  client.on('client-message', data => {
    console.log(data);

    io.emit('server-message', {
      id: v4(),
      user: data.user,
      text: data.message
    });

    // io.emit('server-message', { id: v4(), user: data.user, text: data.message + 123 }); Con esta línea provoco el fallo de actualización de mensajes
  });

  console.log(`✅ Usuario conectado: ${client.id}`);
  io.emit('users-updated', usersConnected);

  client.on('user-disconnected', data => {});

  client.on('disconnect', () => {
    console.log(`❌ Usuario desconectado: ${client.id}`);
  });
});

module.exports = server;
