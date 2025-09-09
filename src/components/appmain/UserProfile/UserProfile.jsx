import "./UserProfile.css";
import user from "../../../assets/user.svg";

function UserProfile({ currentUser, onSwitchClick }) {

  return(
    <>
      <div className="user-profile-container">
        <button className="switchbtn" onClick={onSwitchClick}>Switch</button>
      </div>
      <img src={user} alt="user" className="user-icon" />
      <div className="user">
        {currentUser ? currentUser.name : "Guest"}
      </div>
    </>
  );
}


export default UserProfile; 
