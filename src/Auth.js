// src/Auth.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import React, { useState } from 'react';
import { auth } from './firebase';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const handleAuth = async () => {
    try {
      if (isRegistering) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const userId = userCredential.user.uid;

        // Upload user info to Realtime Database
        set(ref(database, 'users/' + userId), {
          name: name,
          email: email,
          profileImage: profileImage,
          lastSeen: Date.now(),
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>{isRegistering ? "Register" : "Login"}</h1>
      {isRegistering && <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />}
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleAuth}>{isRegistering ? "Register" : "Login"}</button>
      <p onClick={() => setIsRegistering(!isRegistering)}>{isRegistering ? "Already have an account?" : "Don't have an account?"}</p>
    </div>
  );
};

export default Auth;
