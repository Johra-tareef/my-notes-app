import { useNavigate } from "react-router-dom";
import "./NotesList.css";
import arrow from "../../../assets/arrow.svg";

function NotesList({ notes = [], activeNote, setActiveNote, currentUser }) {
  const navigate = useNavigate();

  const highPriorityNotes = notes.filter((note) => note.priority === "high");
  const mediumPriorityNotes = notes.filter((note) => note.priority === "medium");
  const lowPriorityNotes = notes.filter((note) => note.priority === "low");

  const handleNoteClick = (note) => {
    setActiveNote(note.id);
    if (window.innerWidth <= 768 && currentUser) {
      navigate(`/note/${note.id}`, { state: { userId: currentUser.id } });
    }
  };

  return (
    <div className="sidebar-notes">
      <div className="high-priority-group">
        <p className="priority-header">High Priority</p>
        <ul className="notes-list">
          {highPriorityNotes.map((note) => (
            <li
              key={note.id}
              className={`note-item ${
                note.id === activeNote && note.priority === "high" ? "active" : ""
              } note-link`}
              onClick={() => handleNoteClick(note)}
            >
              <span>{note.title}</span>
              <div className="note-right">
                <span className="edit-label">Edit</span>
                <img src={arrow} alt="arrow" className="note-arrow" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="medium-priority-group">
        <p className="priority-header">Medium Priority</p>
        <ul className="notes-list">
          {mediumPriorityNotes.map((note) => (
            <li
              key={note.id}
              className={`note-item ${
                note.id === activeNote && note.priority === "medium" ? "active" : ""
              } note-link`}
              onClick={() => handleNoteClick(note)}
            >
              <span>{note.title}</span>
              <div className="note-right">
                <span className="edit-label">Edit</span>
                <img src={arrow} alt="arrow" className="note-arrow" />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="low-priority-group">
        <p className="priority-header">Low Priority</p>
        <ul className="notes-list">
          {lowPriorityNotes.map((note) => (
            <li
              key={note.id}
              className={`note-item ${
                note.id === activeNote && note.priority === "low" ? "active" : ""
              } note-link`}
              onClick={() => handleNoteClick(note)}
            >
              <span>{note.title}</span>
              <div className="note-right">
                <span className="edit-label">Edit</span>
                <img src={arrow} alt="arrow" className="note-arrow" />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default NotesList;


