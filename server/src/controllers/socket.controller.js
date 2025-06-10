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

io.on('connection', client => {
  client.on('client-message', data => {
    console.log(data);

    io.emit('server-message', { id: v4(), user: data.user, text: data.message });
    io.emit('server-message', { id: v4(), user: data.user, text: data.message + 123 });
  });

  console.log(`✅ Usuario conectado: ${client.id}`);

  client.on('disconnect', () => {
    console.log(`❌ Usuario desconectado: ${client.id}`);
  });
});

module.exports = server;
