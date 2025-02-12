# Real-Time Chat Backend
## Overview
A Node.js, Express, MongoDB, and Socket.IO backend for a real-time chat application. Key features include:

* Real-time messaging (Socket.IO)
* Google OAuth & JWT authentication
* AWS S3 file uploads
* MongoDB persistence (Mongoose)
* Role-based access control (RBAC)
* Security measures (rate-limiting, secure JWT, helmet.)

## Features
* **Real-time Chat**: Messages are delivered instantaneously to all group members.
* **Typing Indicators**: Show when users are typing.
* **Online/Offline Tracking**: Track user status.
* **Message Delivery & Read Receipts**: Keep track of who has read which message.
* **Group Chat**: Create and join groups (channels), manage members, and set roles.
* **Google OAuth + JWT**: Secure authentication and session management.
* **File Sharing**: Upload and share files, stored on AWS S3.
* **Role-Based Access Control (RBAC)**: Restrict certain routes or actions to admins or moderators.
 
## Tech Stack
* **Node.js** & **Express** for server-side logic
* **MongoDB** & **Mongoose** for data persistence
* **Socket.IO** for real-time communication
* **Passport.js** (Google OAuth 2.0) & **JWT** for authentication
* **AWS S3** for file storage
* **Multer** for handling file uploads
* **Helmet** & **Rate-limiting** for security

## Getting Started
### Prerequisites
* **Node.js** (v22.13.1 recommended)
* **npm** or **yarn**
* **MongoDB** instance (local or remote)
* **AWS S3 Bucket** (optional if file sharing is enabled)
* **Google OAuth** Client ID & Secret

### Installation
1. Clone the repository:
   ```bash
   https://github.com/JheyTim/Real-Time-Chat-Backend.git
   cd Real-Time-Chat-Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up the environment variables. Create a .env file in the root directory and add the following:
   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/realtimechat
   GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
   JWT_SECRET=YOUR_JWT_SECRET
   AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY_ID
   AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_ACCESS_KEY
   AWS_REGION=YOUR_AWS_REGION
   AWS_S3_BUCKET_NAME=YOUR_BUCKET_NAME
   ```
4. Start the application:
   ```bash
   npm start
   ```
5. Verify the server:
By default, the server listens on port 3000 (http://localhost:3000). You can modify this in your .env file or in server.js

## License
This project is licensed under the [MIT License](LICENSE).
