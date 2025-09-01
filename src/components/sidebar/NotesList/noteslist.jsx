import "./noteslist.css";
import arrow from "../../../assets/arrow.svg";
import { Link } from "react-router-dom";

function NotesList({ notes = [], activeNote, setActiveNote }) {
  

  const highPriorityNotes = notes.filter(note => note.priority === "high");
  const mediumPriorityNotes = notes.filter(note => note.priority === "medium");
  const lowPriorityNotes = notes.filter(note => note.priority === "low");

  
  return (
    <div className="sidebar-notes">
        <div className='high-priority-group'>
          <p className="priority-header">High Priority</p>
            <ul className="notes-list">

           {highPriorityNotes.map((note) => (
          <Link key={note.id} to={`/note/${note.id}`} className="note-link">
            <li
              className={`note-item ${note.id === activeNote && note.priority === "high" ? "active" : ""}`}
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
          <div className='medium-priority-group'>
            <p className="priority-header">Medium Priority</p>
            <ul className="notes-list">
               {mediumPriorityNotes.map((note) => (
          <Link key={note.id} to={`/note/${note.id}`} className="note-link">
            <li
              className={`note-item ${note.id === activeNote && note.priority === "medium" ? "active" : ""}`}
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
            <div className='low-priority-group'>
            <p className="priority-header">Low Priority</p>
              <ul className="notes-list">
                 {lowPriorityNotes.map((note) => (
          <Link key={note.id} to={`/note/${note.id}`} className="note-link">
            <li
              className={`note-item ${note.id === activeNote && note.priority === "low" ? "active" : ""}`}
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
    </div>
  );
}

export default NotesList;



