import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Sidebar from './components/sidebar/sidebar.jsx';
import AppMain from './components/appmain/app-main.jsx';
import useMediaQuery from './hooks/useMediaQuery';


function App() {
  const [notes, setNotes] = useState(
    localStorage.notes ? JSON.parse(localStorage.notes) : []
  );

  const [noteCount, setNoteCount] = useState(() => {
    const savedNotes = localStorage.notes ? JSON.parse(localStorage.notes) : [];
    const lastNoteNumber = savedNotes.reduce((max, note) => {
      const match = note.title.match(/Note (\d+)/);
      const num = match ? parseInt(match[1], 10) : 0;
      return Math.max(max, num);
    }, 0);
    return lastNoteNumber + 1;
  });

  const [activeNote, setActiveNote] = useState(null);

const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const onAddNote = () => {
    const newNote = {
      id: Date.now(),
      title: `Note ${noteCount}`,
      content: ""
    };
    setNotes(prev => [...prev, newNote]);
    setNoteCount(prev => prev + 1);
    setActiveNote(newNote.id);
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArr = notes.map((note) => {
      if (note.id === updatedNote.id) return updatedNote;
      return note;
    });
    setNotes(updatedNotesArr);
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
        <AppMain
          activeNote={getActiveNote()}
          onUpdateNote={onUpdateNote}
        />
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
