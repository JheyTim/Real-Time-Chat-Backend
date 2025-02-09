const express = require('express');
const passport = require('passport');
require('dotenv').config();

const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const groupRoutes = require('./routes/groupRoutes');

require('./config/passport'); // Initialize passport strategies

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// Custom middlewares like rate limiter can go here
// const rateLimiter = require('./middlewares/rateLimiter');
// app.use('/api', rateLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chats', chatRoutes);
app.use('/api/groups', groupRoutes);

// Error handling middleware
// app.use(errorHandler);

module.exports = app;
