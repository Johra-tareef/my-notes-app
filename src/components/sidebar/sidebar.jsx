import "./Sidebar.css";
import SidebarHeader from "./SidebarHeader/SidebarHeader.jsx";
import NotesList from "./NotesList/NotesList.jsx";
import MobileHeader from "../MobileHeader/MobileHeader.jsx";
import useMediaQuery from "../../hooks/useMediaQuery.js";
import MobileUsersList from "../MobileUsersList/MobileUsersList.jsx";

function Sidebar({ notes, users, onUserSwitch, onAddUser, activeNote, setActiveNote, onAddNote }) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const handleUserSelect = (user) => {
    onUserSwitch(user);
  };

  return (
    <div className="sidebar-app">
      {isMobile ? (
        <>
          <MobileHeader
            showBackBtn={false}
            onAddUser={onAddUser}
            users={users}
            onUserSelect={handleUserSelect}
          />
          <MobileUsersList users={users} onUserSelect={handleUserSelect} />
        </>
      ) : (
        <>
          <SidebarHeader onAddNote={onAddNote} />
          <NotesList
            notes={notes}
            activeNote={activeNote}
            setActiveNote={setActiveNote}
          />
        </>
      )}
    </div>
  );
}

export default Sidebar;
