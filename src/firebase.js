import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD_wnd3cNC6aUKzG9-x0oFOylWzTYTAUj8",
    authDomain: "chatappproj-477c3.firebaseapp.com",
    projectId: "chatappproj-477c3",
    storageBucket: "chatappproj-477c3.firebasestorage.app",
    messagingSenderId: "929338586387",
    appId: "1:929338586387:web:c313e92c68ab11178a16e6"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

export { app, auth, database, storage };
