import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyC3HUFziFFAcM4cUOPQj3wfXY94_H9eLSc",
  authDomain: "my-notes-app---johra.firebaseapp.com",
  projectId: "my-notes-app---johra",
  storageBucket: "my-notes-app---johra.appspot.com",
  messagingSenderId: "829922815043",
  appId: "1:829922815043:web:fc270591c013d60e76b8f6",
  measurementId: "G-KFQW9TZP38"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };