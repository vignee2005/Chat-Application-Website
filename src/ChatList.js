// src/ChatList.js
import { onValue, ref } from 'firebase/database';
import React, { useEffect, useState } from 'react';
import { database } from './firebase';

const ChatList = () => {
  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    const chatroomsRef = ref(database, 'chatrooms');
    onValue(chatroomsRef, (snapshot) => {
      const data = snapshot.val();
      const rooms = data ? Object.values(data) : [];
      setChatrooms(rooms);
    });
  }, []);

  return (
    <div>
      {chatrooms.map((chatroom, index) => (
        <div key={index}>
          <h3>{chatroom.name}</h3>
          {/* Add navigation to open the chat */}
        </div>
      ))}
    </div>
  );
};

export default ChatList;
