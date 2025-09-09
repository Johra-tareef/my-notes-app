import { useEffect, useState } from "react";
import "./UserModal.css";
import { db } from '../../../firebase/firebase.js'; 
import { collection, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import arrow from "../../../assets/arrow.svg";



const UserModal = ({ onClose, onUserSwitch }) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: ''});
  const [selectedUser, setSelectedUser] = useState(null);

  const [userNotes, setUserNotes] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {

        const usersRef = collection(db, 'users');

      const q = query(usersRef, orderBy('name'));

const querySnapshot = await getDocs(q);
        const usersList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersList);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const fetchUserNotes = async (userId) => {
  try {
    const notesRef = collection(db, 'users', userId, 'notes');
    const notesSnapshot = await getDocs(notesRef);
    const notesList = notesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setUserNotes(notesList);
  } catch (error) {
    console.error('Error fetching user notes:', error);
  }
};


  const handleAddUser = async (e) => {
    e.preventDefault();

    if (!newUser.name.trim()) return;

    try {
      const docRef = await addDoc(collection(db, 'users'), newUser);
      setUsers([...users, { id: docRef.id, ...newUser }]);
      setNewUser({ name: ''});
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

    const handleUserSwitch = (user) => {
    onUserSwitch(user);  
    onClose();           
  };

  return (
     <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="switch-user-title">Switch User</span>
        
        <ul className="user-list">
            {users.map(user => (
                <li key={user.id} className="user-item"
                onClick={() => {  
        onUserSwitch(user);         
        onClose();              
      }} >
                    {user.name}
                    <img src={arrow} alt="arrow" className="user-arrow" />
                </li>
            ))}
        </ul>

         {selectedUser && (
    <div className="selected-user-notes">
      <h3>{selectedUser.name}'s Notes</h3>
      <ul>
        {userNotes.map(note => (
          <li key={note.id}>{note.title || note.content || 'No title'}</li>
        ))}
      </ul>
    </div>
  )}


        <span className="or">or</span>



        <form className="input-user-area" onSubmit={handleAddUser}>
            <span className="add-user">Add User</span>
            <div className="input-btn-group">
            <input
            type="text"
            className="user-input"
            placeholder="User name here"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required/>
            <button className="add-user-btn" type="submit">Add</button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;


