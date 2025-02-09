const router = require('express').Router();
const multer = require('multer');
const { uploadFile } = require('../controllers/chatController');
const authMiddleware = require('../middlewares/authMiddleware');

const upload = multer();

router.post('/upload', authMiddleware(), upload.single('file'), uploadFile);

module.exports = router;
