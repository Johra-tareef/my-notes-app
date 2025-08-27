import "./noteslist.css";
import arrow from "../../../assets/arrow.svg";
import { Link } from "react-router-dom";

function NotesList({ notes = [], activeNote, setActiveNote }) {
  
  return (
    <div className="sidebar-notes">
      <ul className="notes-list">
        {notes.map((note) => (
          <Link key={note.id} to={`/note/${note.id}`} className="note-link">
            <li
              className={`note-item ${note.id === activeNote ? "active" : ""}`}
              key={note.id}
              onClick={() => setActiveNote(note.id)}
            >
              <span>{note.title}</span>
              <div className="note-right">
              <span className="edit-label">Edit</span>
              <img src={arrow} alt="arrow" className="note-arrow" />
              </div>

            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default NotesList;
