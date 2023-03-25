import './App.css';
import io from "socket.io-client"
import React from 'react';
import Chat from './chat';

const socket = io.connect("http://localhost:3001");

function App() {
const [name, setName] = React.useState("")
const [room, setRoom] = React.useState("");
const [showChat, setShowChat] = React.useState(false);

const onClick = (e) => {
if (name !== "" && room !== "") {
  socket.emit("join_room", room);
  setShowChat(true);
}
}

  return (
    <div className="App">
    {!showChat ? (
    <div className='joinChatContainer'>
    <h3>Join Chat</h3>
    <input type={"text"} onChange={(e) => setName(e.target.value)} placeholder="enter your name" />
    <input type={"text"} onChange={(e) => setRoom(e.target.value)} placeholder="enter your room id" />
    <button onClick={onClick}>Join room</button>
    </div>
    ) : (
    <Chat socket={socket} name={name} room = {room} />
    )}
    </div>
  );
}

export default App;
