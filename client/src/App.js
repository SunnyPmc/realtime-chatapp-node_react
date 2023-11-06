import React,{ useState } from 'react';
import './App.css';
import io from "socket.io-client"
import Chat from './Chat'; 

const socket = io.connect("http://localhost:5000")

function App() {
  const [username, setUsername] = useState("")
  const [chatRoom, setChatRoom] = useState("")
  const [showChat, setShowChat] = useState(false)

  
  const joinChatRoom = () => {
    if(username !== "" && chatRoom !== "") {
      socket.emit("join_room", chatRoom)
      setShowChat(true)
    }
  }
 

  return (
    <div className="App">
      {!showChat ?
      (<div className="joinChatContainer">
     <h3>Join to chat</h3>
     <input type="text" placeholder='username' onChange={(e) => {
      setUsername(e.target.value)
     }} />
     <input type="text" placeholder='Room Id' onChange={(e) => {
      setChatRoom(e.target.value)
     }} />

     <button onClick={joinChatRoom}>join</button>
     </div>)
    : (
     <Chat socket={socket} username={username} chatRoom={chatRoom}/>
    )}
    </div>
    
   
  );
}

export default App;
