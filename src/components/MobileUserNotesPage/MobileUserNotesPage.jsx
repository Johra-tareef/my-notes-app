import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NotesList from "../sidebar/NotesList/NotesList.jsx";
import vector from "../../assets/Vector.svg";

function MobileUserNotesPage({ users, notes, setCurrentUser, activeNote, setActiveNote, onAddNote }) {
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const user = users.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
    } else {
      navigate("/");
    }
  }, [userId, users, setCurrentUser, navigate]);

  const userNotes = notes.filter((note) => note.userId === userId);

  const currentUser = users.find((u) => u.id === userId);

  return (
    <div className="mobile-notes-page">
      <div className="mobile-header">
        <div className="header-row">
          <button className="backbtn" onClick={() => navigate("/")}>
            <img src={vector} alt="back" />
          </button>
          <p className="user-name-header">{currentUser?.name || "User"}</p>
        </div>

        <div className="mobile-divider"></div>
        <div className="btn-container">
          <button className="add-note-btn" onClick={onAddNote}>
            + Add Note
          </button>
        </div>
      </div>

      <NotesList
        notes={notes}
        activeNote={activeNote}
        setActiveNote={(noteId) => {
          setActiveNote(noteId);
          navigate(`/note/${noteId}`, {
            state: { userId: userId },
          });
        }}
      />
    </div>
  );
}

export default MobileUserNotesPage;
