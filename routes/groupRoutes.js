const express = require('express');
const groupController = require('../controllers/groupController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post(
  '/',
  authMiddleware(['admin', 'moderator']), // only admins or moderators can create groups
  groupController.createGroup
);

router.post(
  '/join',
  authMiddleware(), // any authenticated user can join
  groupController.joinGroup
);

module.exports = router;
