const socketIO = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');
const Group = require('../models/Group');

let io;

const initSocket = (server) => {
  io = socketIO(server, {
    cors: {
      origin: '*',
    },
  });

  io.use(async (socket, next) => {
    try {
      // Extract token from query or headers
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userData = decoded; // attach user data to socket
      return next();
    } catch (error) {
      return next(new Error('Authentication error'));
    }
  });

  io.on('connection', async (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Mark user as online
    await User.findByIdAndUpdate(socket.userData.id, { online: true });

    // Emit user’s online status to others
    socket.broadcast.emit('userOnline', { userId: socket.userData.id });

    // Join rooms/groups to receive relevant messages
    const userGroups = await Group.find({ members: socket.userData.id });
    userGroups.forEach((group) => {
      socket.join(group._id.toString());
    });

    // Listen for typing indicators
    socket.on('typing', (groupId) => {
      socket.to(groupId).emit('typing', { userId: socket.userData.id });
    });

    // Listen for new messages
    socket.on('message', async (data) => {
      const { content, groupId, fileUrl } = data;
      const message = await Message.create({
        sender: socket.userData.id,
        content,
        groupId,
        fileUrl,
      });

      // Emit message to the room
      io.to(groupId).emit('message', message);
    });

    // Listen for read receipts
    socket.on('messageRead', async ({ messageId, groupId }) => {
      const updatedMsg = await Message.findByIdAndUpdate(
        messageId,
        { $addToSet: { readBy: socket.userData.id } },
        { new: true }
      );
      io.to(groupId).emit('messageRead', updatedMsg);
    });

    // Handle disconnect
    socket.on('disconnect', async () => {
      console.log(`User disconnected: ${socket.id}`);
      // Mark user as offline
      await User.findByIdAndUpdate(socket.userData.id, { online: false });
      socket.broadcast.emit('userOffline', { userId: socket.userData.id });
    });
  });
};

module.exports = { initSocket };
