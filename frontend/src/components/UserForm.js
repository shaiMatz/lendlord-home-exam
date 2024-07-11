import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { getAllUsers } from '../services/userService';
import './UserForm.css';

const UserForm = ({ onSave, user }) => {
  const { addUser, updateUserDetails, editingUser, stopEditing } = useContext(UserContext);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dateStarted: '', // Ensure dateStarted is a string in 'YYYY-MM-DD' format
    salary: '',
    role: '',
    manager: '',
  });
  const [managers, setManagers] = useState([]);

  useEffect(() => {
    const fetchManagers = async () => {
      try {
        const users = await getAllUsers();
        setManagers(users.filter(user => user.role === 'manager'));
      } catch (error) {
        console.error('Error fetching managers', error);
      }
    };

    fetchManagers();
  }, []);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        ...editingUser,
        dateStarted: formatDate(editingUser.dateStarted), // Format dateStarted for editing
      });
    } else if (user) {
      setFormData({
        ...user,
        dateStarted: formatDate(user.dateStarted), // Format dateStarted for new user
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        dateStarted: '', // Initialize dateStarted
        salary: '',
        role: '',
        manager: '',
      });
    }
  }, [editingUser, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await updateUserDetails(user._id, formData);
      stopEditing();
    } else {
      console.log("new user", formData)
      await addUser(formData);
    }
    onSave(); // Close modal after saving
  };

  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toISOString().split('T')[0] : '';
  };

  const renderManagerField = () => {
    if (formData.role !== 'manager') {
      return (
        <label className="form-label">
          Manager:
          <select
            name="manager"
            value={formData.manager}
            onChange={handleChange}
            required
            className="form-select"
          >
            <option value="">Select Manager</option>
            {managers.map((manager) => (
              <option key={manager._id} value={manager._id}>
                {manager.firstName} {manager.lastName}
              </option>
            ))}
          </select>
        </label>
      );
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label className="form-label">
        First Name:
      </label>
      <input
        type="text"
        name="firstName"
        value={formData.firstName}
        onChange={handleChange}
        required
        className="form-input"
      />
      <label className="form-label">
        Last Name:
      </label>
      <input
        type="text"
        name="lastName"
        value={formData.lastName}
        onChange={handleChange}
        required
        className="form-input"
      />
      <label className="form-label">
        Email:
      </label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        className="form-input"
      />
      <label className="form-label">
        Date Started:
      </label>
      <input
        type="date"
        name="dateStarted"
        value={formData.dateStarted}
        onChange={handleChange}
        required
        className="form-input"
      />
      <label className="form-label">
        Salary:
      </label>
      <input
        type="number"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
        required
        className="form-input"
      />
      <label className="form-label">
        Role:
      </label>
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
        className="form-select"
      >
        <option value="">Select Role</option>
        <option value="manager">Manager</option>
        <option value="worker">Worker</option>
        <option value="driver">Driver</option>
      </select>
      {renderManagerField()}
      <div className="form-actions">
        <button type="submit" className="form-button">Save</button>
        {editingUser && (
          <>
            <button type="button" className="form-button" onClick={stopEditing}>Cancel</button>
          </>
        )}
      </div>
    </form>
  );
};

export default UserForm;
