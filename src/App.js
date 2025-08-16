import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import Auth from './Auth';
import ChatList from './ChatList';
import { auth } from './firebase';
import Theme from './Theme';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <Theme />
          <ChatList />
          {/* Add Chat component when clicking on a chatroom */}
        </div>
      ) : (
        <Auth />
      )}
    </div>
  );
};

export default App;
