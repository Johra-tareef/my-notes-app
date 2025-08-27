import { useEffect, useState } from "react";
import "./notecontent.css";

function NoteContent({ activeNote, onEditField }) {
  const [localContent, setLocalContent] = useState("");

  useEffect(() => {
    if (activeNote) {
      setLocalContent(activeNote.content || "");
    } else {
      setLocalContent(""); 
    }
  }, [activeNote]);

  const handleBlur = () => {
    if (activeNote) {
      onEditField("content", localContent);
    }
  };

  return (
    <div className="app-note-content">
      <span className="note-content">Note</span>
      <textarea
        key={(activeNote?.id || "empty") + "-content"} 
        type="text"
        id="content"
        placeholder="Your content here"
        value={localContent}
        onChange={(e) => setLocalContent(e.target.value)}
        onBlur={handleBlur}
        disabled={!activeNote} 
      />
    </div>
  );
}

export default NoteContent;
