# 🟣 Circle — Real-Time Chat App

**Circle** is a full-stack real-time chat application built using the **MERN** stack.  
It allows users to **sign up, log in, and chat with friends** instantly with real-time message updates powered by **Socket.io**.

---

## 🚀 Features

- 🔐 **User Authentication** — Sign up, log in, and log out securely.
- 💬 **Real-Time Messaging** — Send and receive messages instantly using Socket.io.
- 🟢 **Online/Offline Status** — See which friends are online in real time.
- 🧑‍🤝‍🧑 **Chat with Friends** — One-to-one conversations with smooth UI updates.
- 🎨 **Modern UI** — Clean and responsive interface built with Tailwind CSS.
- ⚙️ **State Management** — Global state handled efficiently using Redux Toolkit.
- 🧭 **Cross-Device Support** — Works seamlessly on both desktop and mobile views.

---

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- Redux Toolkit
- Tailwind CSS
- Socket.io Client
- daizy.ui

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Socket.io Server
- JWT Authentication
- Multer (for handeling files)
- Cloudinary (for image uploads)

---

## 🧩 How to Run Locally

### 1. Clone the Repository
```bash
git clone https://github.com/vedant-rmgd/Circle-real-time-chat-app.git
cd circle-real-time-chat-app

The root script will automatically install both frontend and backend packages:

npm run build
npm run start

## 🔐 Environment Variables
To run this project, create a `.env` file in the backend folder and add the following:

MONGODB_URL=...
PORT=5001
JWT_SECRET=...

CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

NODE_ENV="development"

