import { ref, set } from "firebase/database";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { database } from "../firebase";

const CreateRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleCreateRoom = async () => {
    if (!roomName) {
      setError("Room name is required");
      return;
    }

    try {
      const userId = "user123"; // Replace with current user's ID
      const roomId = new Date().getTime().toString(); // Unique room ID based on timestamp

      // Create room in Firebase Realtime Database
      await set(ref(database, "rooms/" + roomId), {
        name: roomName,
        creator: userId,
        createdAt: new Date().toISOString(),
      });

      navigate("/chatlist"); // Redirect to ChatList
    } catch (error) {
      setError("Error creating room: " + error.message);
    }
  };

  return (
    <div>
      <h2>Create Room</h2>
      <input
        type="text"
        placeholder="Enter Room Name"
        value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
      />
      <button onClick={handleCreateRoom}>Create Room</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default CreateRoom;
