import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import styled from "styled-components/macro";

const socket = io.connect("localhost:5000");

const Chat = ({ match }) => {
  const roomName = match.params.room;
  const userName = match.params.username;
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [roomUsers, setRoomUsers] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    socket.emit("joinRoom", {
      username: userName,
      room: roomName,
    });
  }, []);
  socket.on("roomUsers", ({ room, users }) => {
    setRoomUsers(users);
  });
  useEffect(scrollToBottom, [messages]);
  useEffect(() => {
    // Trigger 'NEW_MESSAGE' event
    // Message received in the event NEW_MESSAGE

    socket.on("message", (message) => {
      // let temp = [];
      // console.log(temp);
      // temp.push(message);
      setMessages((prevMessages) => {
        let newMessages = [...prevMessages];
        newMessages = [...prevMessages, message];
        return newMessages;
      });
    });
  }, [socket]);

  console.log(messages);

  return (
    <div
      css={`
        display: flex;
        flex-direction: row;
        height: 100%;
        & > div {
          height: 100%;
        }
      `}
    >
      <Panel>
        <Title>Room Name</Title>
        <SubHeader>Room {roomName}</SubHeader>
        <hr />
        <Title>Users in Room</Title>
        {roomUsers &&
          roomUsers.map((user, i) => (
            <SubHeader key={user.id}> {user.username}</SubHeader>
          ))}

        <hr />
      </Panel>
      <ChatRoom>
        <div
          css={`
            overflow: scroll;
            display: flex;
            flex-direction: column;
          `}
        >
          {messages &&
            messages.map((message) => (
              <ChatContainer isUser={message.username === userName}>
                <div>{message.username}</div>
                <div>{message.text}</div>
              </ChatContainer>
            ))}
          <div ref={messagesEndRef} />
        </div>
        <ChatPannel>
          <input
            type="text"
            value={text}
            placeholder="Enter Message"
            onChange={(e) => {
              setText(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              text.length && socket.emit("chatMessage", text) && setText("");
            }}
          >
            Send
          </button>
        </ChatPannel>
      </ChatRoom>
    </div>
  );
};

export default Chat;

const Title = styled.h2`
  text-align: left;
  font-weight: 700;
`;
const SubHeader = styled.h2`
  font-size: 26px;
  text-align: -webkit-auto;
`;

const ChatPannel = styled.div`
  & input {
    width: 100%;
  }
  & button {
    width: 100%;
  }

  display: flex;
  width: 100%;
  position: fixed;
  bottom: 0;
  margin: 10px -15px;
  border-top: 1px solid;
`;
const ChatContainer = styled.div`
display: flex; 
flex-direction: column; 
text-align:left; 
background: ${(props) => (props.isUser ? "#79B4B7" : "#F8F0DF")}; 
padding 10px; 
width 79%;
margin: 10px 0;
align-self: ${(props) => props.isUser && "flex-end"};
`;
const ChatRoom = styled.div`
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  position: relative;
`;
const Panel = styled.div`
  background: #fefbf3;
  width: 350px;
  padding: 15px;
`;
