import { onValue, push, ref } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { auth, database } from "../firebase";

const ChatRoom = () => {
  const { roomId } = useParams(); // Get the roomId from the URL
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = ref(database, `messages/${roomId}`);
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const messageList = data ? Object.values(data) : [];
      setMessages(messageList);
    });
  }, [roomId]);

  const sendMessage = async () => {
    const userId = auth.currentUser.uid; // Get the logged-in user ID
    const newMessage = {
      userId: userId,
      message: message,
      timestamp: Date.now(),
    };
    await push(ref(database, `messages/${roomId}`), newMessage);
    setMessage(""); // Clear input field
  };

  return (
    <div>
      <h1>Chat Room</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.userId}</strong>: {msg.message}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
