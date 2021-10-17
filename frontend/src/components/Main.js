import { useState } from "react";
import "styled-components/macro";
import { Button, FloatingLabel, Form } from "react-bootstrap";
const Main = ({ history }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  console.log(history);

  return (
    <div
      css={`
        height: 100%;
        background: #f9f9f9;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <div
        css={`
          height: 270px;
          width: 450px;
          background: white;
          box-shadow: 0 7px 30px -10px rgba(150, 170, 180, 0.5);
          padding: 10px 16px;
        `}
      >
        <h1
          css={`
            text-align: left;
            font-size: 33px;
            padding: 3px 0;
          `}
        >
          Welcome to DevChat
        </h1>
        <>
          <FloatingLabel
            controlId="floatingInput"
            label="Enter Username"
            className="mb-3"
            value={username}
           
          >
            <Form.Control type="email" placeholder="name@example.com"  onChange={(e)=>{setUsername(e.target.value)}}/>
          </FloatingLabel>
        </>
        <>
          <FloatingLabel controlId="floatingSelect" label="Rooms">
            <Form.Select aria-label="Floating label select example"  onChange={(e)=>{setRoom(e.target.value)}}>
              <option>Open this select menu</option>
              <option value="1">Room One</option>
              <option value="2">Room Two</option>
              <option value="3">Room Three</option>
            </Form.Select>
          </FloatingLabel>
        </>
        <div
          css={`
            padding: 15px 0;
            & button {
              width: 100%;
              padding: 0.7rem 4.75rem;
            }
          `}
        >
          <Button
            onClick={() => {
                console.log('he3he',username.length,username)
              if (username.length && room.length) {
                history.push(`/chat/${room}${username}`);
              }
            }}
            variant="secondary"
          >
            Join Room
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Main;
