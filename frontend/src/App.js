import { io } from "socket.io-client";
import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [sockets, setSockets] = useState(null);

  useEffect(() => {
    
    const socket = io(`localhost:5000`);
    console.log(socket)
    socket.on("message", (message) => {
      setSockets(message);
    });
  }, []);

  return <div>{sockets}</div>;
}

export default App;
