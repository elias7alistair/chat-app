import express from "express";
import path from "path";
import http from "http";
import socketio from "socket.io";
import { formatMessage } from "./public/utils/messages.js";
import cors from 'cors'
import {
  getCurrentUser,
  getRoomUsers,
  userJoin,
  userLeave,
} from "./public/utils/user.js";

const app = express();
const server = http.createServer(app);
const io = socketio(server);
const botName = "elias";

app.use(cors());

//Set static folder
const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "public")));

// Run when a client connects
io.on("connection", (socket) => {
  console.log('heah')
  socket.on("joinRoom", ({ username, room }) => {
    console.log('connected')
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    
    //welcome current user
    socket.emit("message", formatMessage(botName, "welcome to chat"));

    //Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${username} has joined the chat`)
      );

    //send users and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  //listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when client disconncts
  socket.on("disconnect", () => {
    const user = userLeave(socket.id);
    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => console.log(`server running on ${PORT}`));
