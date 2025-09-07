import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/sidebar.jsx";
import AppMain from "./components/appmain/app-main.jsx";
import useMediaQuery from "./hooks/useMediaQuery";
import { getDocs, addDoc, doc, updateDoc, collection } from "firebase/firestore";
import { db } from "./firebase/firebase"; 



function App() {
  const [notes, setNotes] = useState([]);

  const [noteCount, setNoteCount] = useState(1);

  const [activeNote, setActiveNote] = useState(null);

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "notes"));
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),

        }));

        setNotes(fetchedData);

        const lastNoteNumber = fetchedData.reduce((max, note) => {
        const match = note.title.match(/Note (\d+)/);
        const num = match ? parseInt(match[1], 10) : 0;
        return Math.max(max, num);
      }, 0);
      setNoteCount(lastNoteNumber + 1);

      }
      catch (error){
        console.error("Error fetching documents:", error); 

      }

    };
    fetchNotes();
  }, []);


  const onAddNote = async () => {
    const newNote = {
      title: `Note ${noteCount}`,
      content: "",
      priority: "priority"
    };

    const docRef = await addDoc(collection(db, "notes"), newNote);
    setNotes(prev => [...prev, { ...newNote, id: docRef.id }]);
    setNoteCount((prev) => prev + 1);
    setActiveNote(docRef.id);
  };

  const onUpdateNote = async (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) return updatedNote;
      return note;
    });
    setNotes(updatedNotesArr);

      try {
    const docRef = doc(db, "notes", updatedNote.id);
    await updateDoc(docRef, updatedNote);
  } catch (error) {
    console.error("Error updating note in Firestore:", error);
  }
};


  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  };

  return (
    <div className="app">
      {!isMobile ? (
        <>
          <Sidebar
            notes={notes}
            onAddNote={onAddNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
          />
          <AppMain activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
        </>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Sidebar
                notes={notes}
                onAddNote={onAddNote}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
              />
            }
          />
          <Route
            path="/note/:id"
            element={
              <AppMain
                activeNote={getActiveNote()}
                onUpdateNote={onUpdateNote}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
