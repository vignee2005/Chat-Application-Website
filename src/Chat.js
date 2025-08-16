import { onValue, push, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { database } from './firebase';

const Chat = ({ chatroomId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const messageData = {
        senderId: 'currentUserId',  // Replace with actual user ID
        text: message,
        timestamp: Date.now(),
      };
      push(ref(database, 'chatrooms/' + chatroomId + '/messages'), messageData);
      setMessage('');
    }
  };

  useEffect(() => {
    const messagesRef = ref(database, 'chatrooms/' + chatroomId + '/messages');
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const allMessages = data ? Object.values(data) : [];
      setMessages(allMessages);
    });
  }, [chatroomId]);

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.text}</p>
        ))}
      </div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;
