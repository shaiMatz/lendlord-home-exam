import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import './FilterMenu.css';

const FilterMenu = ({ toggleModal }) => {
  const { updateSearchText, updateFilterRole } = useContext(UserContext);

  const handleSearchChange = (e) => {
    updateSearchText(e.target.value);
  };

  const handleFilterChange = (e) => {
    updateFilterRole(e.target.value);
  };

  return (
    <div className="filter-menu">
        
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        onChange={handleSearchChange}
      />
<div className='buttons-filter'>
      <select
        className="filter-select"
        onChange={handleFilterChange}
      >
        <option value="">All Roles</option>
        <option value="Manager">Manager</option>
        <option value="Worker">Worker</option>
        <option value="Driver">Driver</option>
      </select>
      <button className="add-user-button" onClick={toggleModal}>Add User</button>
   </div>
    </div>
  );
};

export default FilterMenu;
