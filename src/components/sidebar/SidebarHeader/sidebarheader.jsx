import "./sidebarheader.css";


function SidebarHeader({ onAddNote }) {

    return (
           <div className='sidebar-app-header'>
        <p>My Notes App</p>
        <div className='btn-container'>
          <button className='add-note-btn' onClick={onAddNote}>+ Add Note</button>
        </div>
      </div>
    )
}


export default SidebarHeader;