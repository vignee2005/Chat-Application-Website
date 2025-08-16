import { onValue, push, ref, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../firebase";

const RoomChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const { roomId } = useParams(); // Get roomId from URL (passed via React Router)
  const userId = "user123"; // Replace with current user's ID
  const roomRef = ref(database, `rooms/${roomId}/messages`);

  useEffect(() => {
    // Listen to messages in real-time
    onValue(roomRef, (snapshot) => {
      const data = snapshot.val();
      const messageList = data ? Object.values(data) : [];
      setMessages(messageList);
    });
  }, [roomId]);

  const handleSendMessage = async () => {
    if (message.trim()) {
      const newMessageRef = push(roomRef);
      await set(newMessageRef, {
        userId: userId,
        text: message,
        timestamp: new Date().toISOString(),
      });
      setMessage(""); // Clear input after sending message
    }
  };

  return (
    <div>
      <h2>Chat Room: {roomId}</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}><strong>{msg.userId}</strong>: {msg.text}</p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default RoomChat;
