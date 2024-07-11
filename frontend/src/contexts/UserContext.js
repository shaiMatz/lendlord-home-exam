import React, { createContext, useState, useEffect } from 'react';
import { getAllUsers, createUser, updateUser, deleteUser } from '../services/userService';
import Modal from '../components/modal';
import '../components/ConfirmationDialog.css';
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [userToDelete, setUserToDelete] = useState(null); // Track user to delete
  const [loading, setLoading] = useState(false); // Loading state
  const [shown, setShown] = useState(false); // Modal visibility state

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const users = await getAllUsers();
      setUsers(users);
    } catch (error) {
      console.error('Error fetching users', error);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async (user) => {
    try {
            // Check if the role is 'manager' and set the manager field to null
    if (user.role === 'manager') {
      user.manager = null;
    }
        console.log(" user in add user", user)
      await createUser(user);
      await fetchUsers();
    } catch (error) {
      console.error('Error adding user', error);
    }
  };

  const updateUserDetails = async (id, user) => {
    try {
            // Check if the role is 'manager' and set the manager field to null
    if (user.role === 'manager') {
      user.manager = null;
    }
      await updateUser(id, user);
      await fetchUsers();
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const removeUser = async (id) => {
    try {
      await deleteUser(id);
      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const startEditing = (user) => {
    setEditingUser(user);
  };

  const stopEditing = () => {
    setEditingUser(null);
  };

  const updateSearchText = (text) => {
    setSearchText(text);
  };

  const updateFilterRole = (role) => {
    setFilterRole(role);
  };

  const confirmDelete = (id) => {
    setUserToDelete(id);
    setShown(true); // Show the confirmation modal
  };

  const cancelDelete = () => {
    setShown(false); // Hide the confirmation modal
    setUserToDelete(null);
  };

  const proceedDelete = async () => {
    if (userToDelete) {
      await removeUser(userToDelete);
      setShown(false); // Hide the confirmation modal
      setUserToDelete(null);
    }
  };

  const toggleModal = () => {
    setShown(prev => !prev); // Toggle modal visibility
  };

  return (
    <UserContext.Provider
      value={{
        users,
        addUser,
        updateUserDetails,
        removeUser,
        editingUser,
        startEditing,
        stopEditing,
        searchText,
        filterRole,
        updateSearchText,
        updateFilterRole,
        confirmDelete,
        loading, // Provide loading state to consumer
        fetchUsers, // Provide fetchUsers function to consumer
      }}
    >
      {children}

      {/* Confirmation Dialog */}
 <Modal displayModal={shown} closeModal={toggleModal}>
    <div className="confirmation-dialog">
      <p>Are you sure you want to delete this user?</p>
    <div className='actions'>  <button onClick={proceedDelete}>Yes</button>
      <button onClick={cancelDelete}>No</button>
    </div></div>
  </Modal>
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
