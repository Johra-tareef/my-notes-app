import "./notepriority.css";

function NotePriority({ activeNote, onEditField }) {


   const handleChange = (event) => {
        onEditField("priority", event.target.value);
      };


  return (
    <div className="app-note-priority">
      <span className="priority-note">Priority</span>
      <select id="selected-priority" value={activeNote?.priority || ""} onChange={handleChange}>
        <option>Priority</option>
        <option>low</option>
        <option>medium</option>
        <option>high</option>
      </select>
    </div>
  );
}

export default NotePriority;


  