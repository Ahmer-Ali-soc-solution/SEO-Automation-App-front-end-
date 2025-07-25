import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';
import ConnectCards from './ConnectCards';
import ManageServices from './ManageServices';
import ServiceAreas from './ServiceAreas';
import KeywordPerformance from './KeywordPerformance';
import ClientProfile from './ClientProfile';
import CompanyDetails from './CompanyDetails';
import ManageReviews from './ManageReviews';
import ManageBlogs from './ManageBlogs';

import { FiMenu } from 'react-icons/fi';
import './Dashboard.css';  

function Dashboard() {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (confirmed) {
      navigate('/');
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-wrapper">
        {/* Sidebar Column */}
        <div className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar
            onSelect={(section) => {
              setActiveSection(section);
              setSidebarOpen(false);
            }}
            activeSection={activeSection}
            isOpen={sidebarOpen}
          />
        </div>

        {/* Toggle Button for Mobile */}
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FiMenu size={24} />
        </button>

        {/* Main Content Column */}
        <div className="dashboard-content">
          <div className="header-wrapper">
            <Header onLogout={handleLogout} />
          </div>

          {activeSection === 'Dashboard' && (
            <>
              <ConnectCards />
              <ManageServices />
              <div className="app-wrapper">
                <div className="half-width">
                  <ServiceAreas />
                  <ManageReviews />
                </div>
                <div className="half-width">
                  <KeywordPerformance />
                  <ManageBlogs />
                </div>
              </div>
            </>
          )}

          {activeSection === 'Client Profiles' && <ClientProfile />}
          {activeSection === 'Company Details' && <CompanyDetails />}
          {activeSection === 'Manage Reviews' && <ManageReviews />}
          {activeSection === 'Manage Blogs' && <ManageBlogs />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
