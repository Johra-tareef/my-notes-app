import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import NoteTitle from "../appmain/NoteTitle/NoteTitle.jsx";
import NotePriority from "../appmain/NoteContent/NotePriority.jsx";
import NoteContent from "../appmain/NoteContent/NoteContent.jsx";
import Saved from "../appmain/Saved/Saved.jsx";
import vector from "../../assets/Vector.svg";

function MobileNoteDetailPage({ notes, activeNote, setActiveNote, onUpdateNote, setCurrentUser, users }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [showSaved, setShowSaved] = useState(false);

  const userId = location.state?.userId;

  useEffect(() => {
    if (userId && users?.length) {
      const user = users.find((u) => u.id === userId);
      if (user) {
        setCurrentUser(user);
      }
    }
  }, [userId, users, setCurrentUser]);

  useEffect(() => {
    setActiveNote(id);
  }, [id, setActiveNote]);

  const note = notes.find((note) => note.id === id);

  const onEditField = (field, newValue) => {
    if (!note || note[field] === newValue) return;
    const updatedNote = { ...note, [field]: newValue };
    onUpdateNote(updatedNote);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  if (!note) {
    return (
      <div className="mobile-note-detail">
        <p>Note not found</p>
        <button onClick={() => navigate("/")}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="mobile-note-page">
      <div className="mobile-header">
        <div className="header-row">
          <button
            className="backbtn"
            onClick={() => {
              if (userId) {
                navigate(`/user/${userId}`);
              } else {
                navigate("/");
              }
            }}
          >
            <img src={vector} alt="back" />
          </button>
          <p>{note.title}</p>
        </div>
        <hr className="mobile-divider" />
      </div>

      <div className="title-content-container">
        <Saved show={showSaved} />

        <NoteTitle activeNote={note} onEditField={onEditField} />
        <NotePriority activeNote={note} onEditField={onEditField} />
        <NoteContent activeNote={note} onEditField={onEditField} />
      </div>
    </div>
  );
}

export default MobileNoteDetailPage;
