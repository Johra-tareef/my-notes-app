import { useState } from "react";
import "./AppMain.css";
import Saved from "./Saved/Saved.jsx";
import NoteTitle from "./NoteTitle/NoteTitle.jsx";
import NoteContent from "./NoteContent/NoteContent.jsx";
import NotePriority from "./NoteContent/NotePriority.jsx";
import MobileHeader from "../MobileHeader/MobileHeader.jsx";
import useMediaQuery from "../../hooks/useMediaQuery.js";
import UserProfile from "./UserProfile/UserProfile.jsx";
import UserModal from "./UserModal/UserModal.jsx";

function AppMain({ activeNote, onUpdateNote, currentUser, setCurrentUser }) {
  const [showSaved, setShowSaved] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 768px)");

  const onEditField = (field, newValue) => {
    if (!activeNote || newValue === activeNote[field]) return;

    const updatedNote = { ...activeNote, [field]: newValue };
    onUpdateNote(updatedNote);
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const handleUserSwitch = (user) => {
    setCurrentUser(user);
    setIsModalOpen(false);
  };

  return (
    <div className="app-main">
      {isMobile && <MobileHeader showBackBtn={true} activeNote={activeNote} />}

      <UserProfile
        currentUser={currentUser}
        onSwitchClick={() => setIsModalOpen(true)}
      />

      {isModalOpen && (
        <UserModal
          onClose={() => setIsModalOpen(false)}
          onUserSwitch={handleUserSwitch}
        />
      )}

      <div className="title-content-container">
        <Saved show={showSaved} />
        {activeNote ? (
          <>
            <NoteTitle activeNote={activeNote} onEditField={onEditField} />
            <NotePriority activeNote={activeNote} onEditField={onEditField} />
            <NoteContent activeNote={activeNote} onEditField={onEditField} />
          </>
        ) : (
          <p className="no-active-note">No note selected</p>
        )}
      </div>
    </div>
  );
}

export default AppMain;
