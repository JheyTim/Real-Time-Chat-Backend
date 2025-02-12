const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../config/s3Client');
const { v4: uuidv4 } = require('uuid');

exports.uploadFileToS3 = async (file) => {
  const fileName = `${uuidv4()}-${file.originalname}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));

    const fileUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;

    return fileUrl;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
};
