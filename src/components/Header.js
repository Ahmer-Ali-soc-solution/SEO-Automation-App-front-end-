import React from 'react';
import { FiSettings, FiUser, FiSearch } from 'react-icons/fi';
import './Header.css';

function Header({ onLogout }) {
  const handleUserClick = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      onLogout();
    }
  };

  return (
    <div className="header-container">
      {/* Search Bar Container */}
      <div className="search-bar-container">
        <FiSearch className="search-icon" />
        
        <input
          type="text"
          placeholder="Search..."
          className="search-input"
        />
      </div>

      {/* Icons */}
      <div className="icons-container">
        <FiSettings className="icon" />
        <FiUser className="icon" onClick={handleUserClick} />
      </div>
    </div>
  );
}

export default Header;
