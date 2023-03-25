import React from 'react';
import { useEffect } from 'react';
// import ScrollToBottom from "react-scroll-to-bottom";
import ScrollToBottom from "react-scroll-to-bottom";


function Chat({ socket, name, room }) {
    const [currentMessage, setCurrentMessage] = React.useState("")
    const [MessageList, setMessageList] = React.useState([])

    const sendMessage = async (e) => {
        if (currentMessage !== "") {
            const message = {
                room: room,
                author: name,
                message: currentMessage,
                time: new Date(Date.now()).getHours()
                    + ":" + new Date(Date.now()).getMinutes()

            }
            await socket.emit("send_message", message);
            setMessageList((list) => [...list, message]);
            setCurrentMessage("");
        }
    }
    useEffect(() => {
        socket.on("receive_message", (message) => {
            // console.log("receive_message", message);
            setMessageList((list) => [...list, message])
        });
    }, [socket]);
    return (
        <div className="chat-window">
            <div className='chat-header'>
                <p>Live chat</p>
            </div>
            <div className='chat-body'>
            <ScrollToBottom className="message-container">
          {MessageList.map((message) => {
            return (
              <div
                className="message"
                id={name === message.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{message.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{message.time}</p>
                    <p id="author">{message.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
            </div>
            <div className='chat-footer'>
            <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown ={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>send</button>
            </div>
        </div>
    );
}

export default Chat;
