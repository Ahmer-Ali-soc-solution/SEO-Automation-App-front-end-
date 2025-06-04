import React from 'react';
import logo from '../assets/images/logo.png';

import {
  FiHome,
  FiUser,
  FiStar,
  FiEdit,
  FiSettings,
  FiInfo,
  FiBarChart2
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

function Sidebar({ onSelect, activeSection }) {
  const listItemStyle = {
    padding: '10px',
    paddingLeft: '5px',
    marginBottom: '10px',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
  };

  return (
    <div style={{ 
      width: '200px', 
      color: '#fff', 
      height: '100vh', 
      padding: '5px', 
      boxSizing: 'border-box'
    }}>
      {/* Logo */}
      <div style={{ 
  marginBottom: '30px', 
  textAlign: 'center', 
  padding: '10px' 
}}>
  <div style={{
    backgroundColor: '#0f172a', // match sidebar color
    padding: '10px',
    borderRadius: '10px',
    display: 'inline-block',
  }}>
    <img 
      src={logo} 
      alt="Logo" 
      style={{ 
        height: '60px', 
        objectFit: 'contain',
        display: 'block',
        marginLeft: '-10px',
      }} 
    />
  </div>
</div>


      {/* Menu */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {menuItems.map((item, index) => (
          <li
            key={index}
            onClick={() => onSelect(item.label)}
            style={{
              ...listItemStyle,
              backgroundColor: activeSection === item.label ? '#fff' : 'transparent',
              color: activeSection === item.label ? '#000' : '#fff',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#fff';
              e.currentTarget.style.color = '#000';
            }}
            onMouseLeave={e => {
              if (activeSection !== item.label) {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#fff';
              }
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
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
