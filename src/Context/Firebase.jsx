import { createContext, useContext } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const handleCreateNewNotes = async (title, body, tagline, pin = false) => {
    try {
      await addDoc(collection(firestore, 'notes'), {
        title,
        body,
        tagline,
        pin,
        createdAt: new Date(),
      });
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const togglePinStatus = async (noteId, currentStatus) => {
    try {
      const noteRef = doc(firestore, 'notes', noteId);
      await updateDoc(noteRef, { pin: !currentStatus });
    } catch (error) {
      console.error('Error updating pin status:', error);
    }
  };

  const listAllNotes = async () => {
    try {
      const notesQuery = query(
        collection(firestore, 'notes'),
        orderBy('pin', 'desc'),
        orderBy('createdAt', 'desc')
      );
      const notes = await getDocs(notesQuery);
      return notes;
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const updateNote = async (noteId, updatedData) => {
    try {
      const noteRef = doc(firestore, 'notes', noteId);
      await updateDoc(noteRef, updatedData);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const deleteNote = async (noteId) => {
    try {
      const noteRef = doc(firestore, 'notes', noteId);
      await deleteDoc(noteRef);
      console.log("Note deleted successfully!");
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };
  

  return (
    <FirebaseContext.Provider value={{ handleCreateNewNotes, listAllNotes, togglePinStatus, updateNote, deleteNote }}>
      {props.children}
    </FirebaseContext.Provider>
  );
};
