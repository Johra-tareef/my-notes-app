import "./mobileheader.css";
import vector from "../../assets/Vector.svg";
import { useNavigate } from "react-router-dom";




function MobileHeader({ showBackBtn = false, onAddNote }) {

  const navigate = useNavigate();
  

    return (
    <div className="mobile-header">
      {showBackBtn ? (
        <div className="header-row">
          <button className="backbtn" onClick={() => navigate('/')}>
            <img src={vector} alt="back" />
          </button>
          <p>My Notes App</p>
        </div>
      ) : (
        <p>My Notes App</p>
      )}

      <div className="mobile-divider"></div>
       {onAddNote && (
        <div className="btn-container">
          <button className="add-note-btn" onClick={onAddNote}>
            + Add Note
          </button>
        </div>
      )}
    </div>
  );
}


export default MobileHeader;