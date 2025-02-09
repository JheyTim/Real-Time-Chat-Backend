const { uploadFileToS3 } = require('../utils/s3Upload');
const Message = require('../models/Message');

exports.uploadFile = async (req, res) => {
  try {
    // Upload to S3
    const fileUrl = await uploadFileToS3(req.file);

    // Optionally, create a Message record if needed
    const newMessage = await Message.create({
      sender: req.user.id,
      fileUrl,
      content: '', // optional
      groupId: req.body.groupId,
    });

    return res.json({ message: 'File uploaded successfully', newMessage });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'File upload failed' });
  }
};
