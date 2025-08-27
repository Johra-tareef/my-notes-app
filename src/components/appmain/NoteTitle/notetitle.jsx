import { useEffect, useState } from "react";
import "./notetitle.css";

function NoteTitle({ activeNote, onEditField }) {
  const [localTitle, setLocalTitle] = useState("");

  useEffect(() => {
    if (activeNote) {
      setLocalTitle(activeNote.title || "");
    } else {
      setLocalTitle(""); 
    }
  }, [activeNote]);

  const handleBlur = () => {
    if (activeNote) {
      onEditField("title", localTitle);
    }
  };

  return (
    <div className="app-note-title">
      <span className="title-note">Title</span>
      <textarea
        key={(activeNote?.id || "empty") + "-title"} 
        type="text"
        id="title"
        placeholder="Your title here"
        value={localTitle}
        onChange={(e) => setLocalTitle(e.target.value)}
        onBlur={handleBlur}
        disabled={!activeNote} 
      />
    </div>
  );
}

export default NoteTitle;
