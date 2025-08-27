import { useState } from "react";
import "./app-main.css";
import Saved from "./Saved/saved.jsx";
import NoteTitle from "./NoteTitle/notetitle.jsx";
import NoteContent from "./NoteContent/notecontent.jsx";
import MobileHeader from "../MobileHeader/mobileheader.jsx";
import useMediaQuery from '../../hooks/useMediaQuery';


function AppMain({ activeNote, onUpdateNote }) {

  const [showSaved, setShowSaved] = useState(false);

  const isMobile = useMediaQuery('(max-width: 768px)');


    const onEditField = (field, value) => {

       if (value !== activeNote[field]) {

    onUpdateNote({
      ...activeNote,
      [field]: value,
    });

    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);

  }
};

    return (
    
    <div className='app-main'>
      
      {isMobile && <MobileHeader showBackBtn={true} />}

        <div className="title-content-container">

          <Saved show={showSaved} />

          <NoteTitle activeNote={activeNote} onEditField={onEditField} />

          <NoteContent activeNote={activeNote} onEditField={onEditField} />
          
            
        </div>
       

    </div>
    )
}


export default AppMain;
