import { useNavigate } from "react-router-dom";
import "./MobileUsersList.css";
import arrow from "../../assets/arrow.svg";

function MobileUsersList({ users }) {
  const navigate = useNavigate();

  return (
    <div className="mobile-users-list">
      <ul className="users-list">
        {users.map((user) => (
          <li
            key={user.id}
            className="user-item"
            onClick={() => navigate(`/user/${user.id}`)}
          >
            {user.name}
            <img src={arrow} alt="arrow" className="user-arrow" />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MobileUsersList;

