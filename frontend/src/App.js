import "./App.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
// socketIOClient is used in front-end to connect with socket backend url
const socket = io.connect('localhost:5000');

function App() {
  useEffect(() => {
    // Trigger JOIN_ROOM with unique room ID

    // EMIT
    // The Socket.IO API is inspired from the Node.js EventEmitter,
    // which means you can emit events on one side and register listeners on the other:
    // server-side- io.on("connection", (socket) => { socket.emit("hello", "world");

    socket.emit("joinRoom", { username: "ali", room: "js" });
  }, []);
  useEffect(() => {
    // Trigger 'NEW_MESSAGE' event
    // Message received in the event NEW_MESSAGE
    socket.on("message", (message) => {
      console.log(message);
    });
  }, []);
 
  console.log(socket)

  return <div>h</div>;
}

export default App;
