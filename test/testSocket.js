const { io } = require('socket.io-client');

const SERVER_URL = 'http://localhost:3000';
const socket = io(SERVER_URL, {
  auth: {
    token:
      '', // Acquire from a successful login
  },
});

// Connection successful
socket.on('connect', () => {
  console.log('Connected to server via WebSocket:', socket.id);

  // Test an event, for example "typing" or "message"
  const groupId = '67a8f5dd7adf11ba9bd62642';
  socket.emit('typing', groupId);

  // Or send a message
  socket.emit('message', {
    content: 'Hello from test script!',
    groupId: groupId,
  });
});

// Listen for the server's broadcast of the same events
socket.on('typing', (data) => {
  console.log('Received typing event:', data);
});

socket.on('message', (data) => {
  console.log('Received message:', data);
});

// Error events
socket.on('connect_error', (err) => {
  console.error('Connection error:', err.message);
});

socket.on('disconnect', (reason) => {
  console.log('Disconnected from server:', reason);
});
