import "./MobileHeader.css";
import vector from "../../assets/Vector.svg";
import { useNavigate } from "react-router-dom";


function MobileHeader({ showBackBtn = false, onBack, title = "My Notes App", onAddUser }) {
  return (
    <div className="mobile-header">
      {showBackBtn ? (
        <div className="header-row">
          <button className="backbtn" onClick={onBack}>
            <img src={vector} alt="back" />
          </button>
          <p>{title}</p>
        </div>
      ) : (
        <p>{title}</p>
      )}

      <div className="mobile-divider"></div>

      {onAddUser && (
        <div className="btn-container">
          <button className="add-user-button" onClick={onAddUser}>
            + Add User
          </button>
        </div>
      )}
    </div>
  );
}

export default MobileHeader;
