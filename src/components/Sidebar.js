import React from 'react';
import './Sidebar.css'; 
import logo from '../assets/images/logo.png';
import {
  FiHome,
  FiUser,
  FiStar,
  FiEdit,
  FiSettings,
  FiInfo,
  FiBarChart2,
} from 'react-icons/fi';

const menuItems = [
  { label: 'Dashboard', icon: <FiHome /> },
  { label: 'Client Profiles', icon: <FiUser /> },
  { label: 'Manage Reviews', icon: <FiStar /> },
  { label: 'Manage Blogs', icon: <FiEdit /> },
  { label: 'Manage Services', icon: <FiSettings /> },
  { label: 'Company Details', icon: <FiInfo /> },
  { label: 'Analytics', icon: <FiBarChart2 /> },
];

function Sidebar({ onSelect, activeSection, isOpen }) {
  return (
    <div className={`app-sidebar ${isOpen ? 'open' : ''}`}>
      {/* Logo */}
      <div className="app-sidebar-logo">
        <div className="app-sidebar-logo-bg">
          <img src={logo} alt="Logo" />
        </div>
      </div>

      {/* Menu Items */}
      <ul className="app-sidebar-menu">
        {menuItems.map((item, index) => (
          <li
            key={index}
            className={`app-sidebar-item ${activeSection === item.label ? 'active' : ''}`}
            onClick={() => onSelect(item.label)}
          >
            <div className="app-sidebar-link">
              {item.icon}
              <span>{item.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
