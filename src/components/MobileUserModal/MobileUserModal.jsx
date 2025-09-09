import { useState, useEffect } from "react";
import "./MobileUserModal.css";

function MobileUserModal({ onClose, onUserAdded }) {
  const [newUser, setNewUser] = useState({ name: "" });

  
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);
  
  
  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.name.trim()) return;
    onUserAdded({ ...newUser });
    setNewUser({ name: "" });
    onClose();
  };

  
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form className="input-user-area" onSubmit={handleAddUser}>
          <span className="add-user">Add User</span>
          <div className="input-btn-group">
            <input
              type="text"
              className="user-input"
              placeholder="User name here"
              value={newUser.name}
              onChange={(e) =>
                setNewUser({ ...newUser, name: e.target.value })
              }
              required
            />
            <button className="add-user-btn" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MobileUserModal;



