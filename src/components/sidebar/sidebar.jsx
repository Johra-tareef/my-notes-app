import "./sidebar.css";
import SidebarHeader from "./SidebarHeader/sidebarheader.jsx";
import NotesList from "./NotesList/noteslist.jsx";
import MobileHeader from "../MobileHeader/mobileheader.jsx";
import useMediaQuery from '../../hooks/useMediaQuery';





function Sidebar({ notes, onAddNote, activeNote, setActiveNote }) {

      const isMobile = useMediaQuery('(max-width: 768px)');



    return (
         <div className='sidebar-app'>
    {isMobile
        ? <MobileHeader showBackBtn={false} onAddNote={onAddNote} />
        : <SidebarHeader onAddNote={onAddNote} />
      }

          <NotesList 
          notes={notes}
          onAddNote={onAddNote}
          activeNote={activeNote}
          setActiveNote={setActiveNote} />
   
    
    </div>
    )
}


export default Sidebar;



