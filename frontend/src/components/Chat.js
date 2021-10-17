import { useEffect } from "react";
import io from "socket.io-client";
const socket = io.connect("localhost:5000");

const Chat = ({ match }) => {
  useEffect(() => {
    socket.emit("joinRoom", {
      username: match.params.username,
      room: match.params.room,
    });
  }, []);

  useEffect(() => {
    // Trigger 'NEW_MESSAGE' event
    // Message received in the event NEW_MESSAGE
    socket.on("message", (message) => {
      console.log(message);
    });
  }, []);

  return <div></div>;
};

export default Chat;
