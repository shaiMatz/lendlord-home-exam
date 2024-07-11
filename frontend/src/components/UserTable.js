import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import DropdownMenu from './DropdownMenu';
import GenericModal from './modal';
import UserForm from './UserForm';
import './UserTable.css';

const UserTable = () => {
  const {
    users,
    confirmDelete, // New function for confirmation dialog
    searchText,
    filterRole,
    loading, // Assuming loading state is managed in UserContext
    fetchUsers, // Function to fetch users
  } = useContext(UserContext);
  const [sortConfig, setSortConfig] = useState({ key: 'firstName', direction: 'ascending' });
  const [shown, setShown] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users on component mount and whenever necessary


  const sortedUsers = [...users].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const filteredUsers = sortedUsers.filter(user => {
    return (
      (user.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
        user.email.toLowerCase().includes(searchText.toLowerCase())) &&
      (filterRole ? user.role === filterRole : true)
    );
  });

  const requestSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleDelete = async (id) => {
    await confirmDelete(id); // Initiate delete confirmation
    fetchUsers(); // Fetch users after delete
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShown(true);
  };

  const closeModal = () => {
    setShown(false);
    setSelectedUser(null);
  };

  return (
    <div className="table-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th></th>
              <th onClick={() => requestSort('firstName')}>First Name</th>
              <th onClick={() => requestSort('lastName')}>Last Name</th>
              <th onClick={() => requestSort('email')}>Email</th>
              <th onClick={() => requestSort('dateStarted')}>Date Started</th>
              <th onClick={() => requestSort('salary')}>Salary</th>
              <th onClick={() => requestSort('role')}>Role</th>
              <th onClick={() => requestSort('manager')}>Manager</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="8">No users found.</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <DropdownMenu
                      onEdit={() => handleEdit(user)}
                      onDelete={() => handleDelete(user._id)}
                    />
                  </td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{new Date(user.dateStarted).toLocaleDateString()}</td>
                  <td>{user.salary}</td>
                  <td>{user.role}</td>
                  <td>{user.manager}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {shown && (
        <GenericModal displayModal={shown} closeModal={closeModal}>
          <UserForm user={selectedUser} onSave={closeModal} />
        </GenericModal>
      )}
    </div>
  );
};

export default UserTable;
