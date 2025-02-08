const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: false, // If user logs in with Google
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    avatarUrl: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'moderator', 'user'],
      default: 'user',
    },
    // Additional fields for status tracking
    online: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
