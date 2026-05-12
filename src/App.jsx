import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import AppMain from "./components/appmain/AppMain.jsx";
import useMediaQuery from "./hooks/useMediaQuery";
import { getDocs, addDoc, doc, updateDoc, getDoc, setDoc, collection, query, orderBy } from "firebase/firestore";
import { db } from "./firebase/firebase";
import UserModal from "./components/appmain/UserModal/UserModal.jsx";
import MobileUserModal from "./components/MobileUserModal/MobileUserModal.jsx";
import MobileUserNotesPage from "./components/MobileUserNotesPage/MobileUserNotesPage.jsx";
import MobileNoteDetailPage from "./components/MobileNoteDetailPage/MobileNoteDetailPage.jsx";
import { useNavigate } from "react-router-dom";
// import Hello from "./components/Hello.jsx";

function App() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [noteCount, setNoteCount] = useState(1);
  const [activeNote, setActiveNote] = useState(null);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isMobileUserModalOpen, setIsMobileUserModalOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, orderBy("name"));
        const querySnapshot = await getDocs(q);
        const usersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersList);

        const defaultUser =
          usersList.find((u) => u.name.toLowerCase() === "user 1") ||
          usersList[0];
        if (defaultUser) setCurrentUser(defaultUser);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchNotes = async () => {
      if (!currentUser) return;

      try {
        const querySnapshot = await getDocs(
          collection(db, "users", currentUser.id, "notes")
        );
        const fetchedData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setNotes(fetchedData);

        const lastNoteNumber = fetchedData.reduce((max, note) => {
          const match = note.title?.match(/Note (\d+)/);
          const num = match ? parseInt(match[1], 10) : 0;
          return Math.max(max, num);
        }, 0);

        setNoteCount(lastNoteNumber + 1);
        setActiveNote(fetchedData[0]?.id || null);
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, [currentUser]);

  const handleAddNote = () => {
    if (!currentUser) return;

    const newNote = {
      id: Date.now().toString(),
      userId: currentUser.id,
      title: "Note 1",
      content: "",
      priority: "priority",
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
    setActiveNote(newNote.id);

    navigate(`/note/${newNote.id}`, { state: { userId: currentUser.id } });
  };

  const onAddNote = async () => {
    if (!currentUser) return;

    const newNote = {
      title: `Note ${noteCount}`,
      content: "",
      priority: "priority",
    };

    try {
      const docRef = await addDoc(
        collection(db, "users", currentUser.id, "notes"),
        newNote
      );
      const addedNote = { ...newNote, id: docRef.id };
      setNotes((prev) => [...prev, addedNote]);
      setNoteCount((prev) => prev + 1);
      setActiveNote(docRef.id);
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const onUpdateNote = async (updatedNote) => {
    setNotes((prev) =>
      prev.map((note) => (note.id === updatedNote.id ? updatedNote : note))
    );

    try {
      const docRef = doc(db, "users", currentUser.id, "notes", updatedNote.id);
      await setDoc(docRef, updatedNote, { merge: true });
    } catch (error) {
      console.error("Error updating note in Firestore:", error);
    }
  };

  const getActiveNote = () => notes.find((note) => note.id === activeNote);

  const handleUserAdded = (newUser) => {
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser(newUser);
    setIsUserModalOpen(false);
  };

  const handleUserSwitch = (user) => {
    setCurrentUser(user);
    setIsUserModalOpen(false);
  };

  return (
    <div className="app">
      {!isMobile ? (
        <>
          <Sidebar
            notes={notes}
            users={users}
            onAddUser={() => setIsUserModalOpen(true)}
            onAddNote={onAddNote}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
            currentUser={currentUser}
            onUserSwitch={handleUserSwitch}
          />
          <AppMain
            activeNote={getActiveNote()}
            onUpdateNote={onUpdateNote}
            currentUser={currentUser}
            setCurrentUser={setCurrentUser}
          />
        </>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              <Sidebar
                users={users}
                onAddUser={() => setIsMobileUserModalOpen(true)}
                currentUser={currentUser}
                onUserSwitch={handleUserSwitch}
              />
            }
          />

             {/* <Route
            path="/Hello"
            element={
              <Hello />
            }
          /> */}

          <Route
            path="/user/:userId"
            element={
              <MobileUserNotesPage
                users={users}
                notes={notes}
                setCurrentUser={setCurrentUser}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
                onAddNote={handleAddNote}
              />
            }
          />

          <Route
            path="/note/:id"
            element={
              <MobileNoteDetailPage
                notes={notes}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
                onUpdateNote={onUpdateNote}
                setCurrentUser={setCurrentUser}
                users={users}
              />
            }
          />
        </Routes>
      )}

      {isUserModalOpen && (
        <UserModal
          onClose={() => setIsUserModalOpen(false)}
          onUserSwitch={handleUserSwitch}
          onUserAdded={handleUserAdded}
        />
      )}
      {isMobileUserModalOpen && isMobile && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("modal-overlay")) {
              setIsMobileUserModalOpen(false);
            }
          }}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form
              className="input-user-area"
              onSubmit={(e) => {
                e.preventDefault();
                const newUser = { name: e.target.username.value.trim() };

                if (!newUser.name) return;

                addDoc(collection(db, "users"), newUser)
                  .then((docRef) => {
                    const userWithId = { ...newUser, id: docRef.id };
                    setUsers((prev) => [...prev, userWithId]);
                    setCurrentUser(userWithId);
                  })
                  .catch((error) => {
                    console.error("Error adding user:", error);
                  });

                setIsMobileUserModalOpen(false);
              }}
            >
              <span className="add-user">Add User</span>
              <div className="input-btn-group">
                <input
                  name="username"
                  type="text"
                  className="user-input"
                  placeholder="User name here"
                  required
                />
                <button className="add-user-btn" type="submit">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;




