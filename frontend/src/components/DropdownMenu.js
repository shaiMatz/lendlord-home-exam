import React, { useState, useRef, useEffect } from 'react';
import './DropdownMenu.css';

const DropdownMenu = ({ onEdit, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const handleToggleMenu = () => {
    setShowMenu(prevShowMenu => !prevShowMenu);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="actions" ref={menuRef}>
      <button className="menu-button" onClick={handleToggleMenu}>
        <svg className="menu-icon" viewBox="0 0 24 24">
          <circle cx="12" cy="5" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="19" r="2" />
        </svg>
      </button>
      <div className={`dropdown-menu ${showMenu ? 'show' : ''}`}>
        <div className="dropdown-item" onClick={onEdit}>Edit</div>
        <div className="dropdown-item" onClick={onDelete}>Delete</div>
      </div>
    </div>
  );
};

export default DropdownMenu;
