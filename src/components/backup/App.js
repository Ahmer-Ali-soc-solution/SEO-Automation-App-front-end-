import React, { useState } from 'react';
import LoginPage from './components/LoginPage'; // import the login page
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import ConnectCards from './components/ConnectCards';
import ManageServices from './components/ManageServices';
import ServiceAreas from './components/ServiceAreas';
import KeywordPerformance from './components/KeywordPerformance';
import ClientProfile from './components/ClientProfile';
import CompanyDetails from './components/CompanyDetails';

function App() {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <LoginPage onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #2B4DBA 0.5%, #ffffff 99.5%)',
        padding: '5px',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        style={{
          display: 'flex',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
          width: '1440px',
          maxWidth: '100%'
        }}
      >
        {/* Sidebar */}
        <div
          style={{
            backgroundColor: '#111827',
            color: '#fff',
            padding: '20px',
            width: '190px',
            borderRadius: '20px',
          }}
        >
          <Sidebar onSelect={setActiveSection} activeSection={activeSection} />
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '10px' }}>
          {/* Header with logout button */}
          <div style={{flex: 1, padding: '10px' }}>
            <Header onLogout={() => setIsLoggedIn(false)} />
            {/* <button
              onClick={() => setIsLoggedIn(false)}
              style={{
                marginRight: '20px',
                padding: '8px 16px',
                backgroundColor: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button> */}
          </div>

          {activeSection === 'Dashboard' && (
            <>
              <ConnectCards />
              <ManageServices />
              <div className="app-wrapper">
                <div className="half-width">
                  <ServiceAreas />
                </div>
                <div className="half-width">
                  <KeywordPerformance />
                </div>
              </div>
            </>
          )}

          {activeSection === 'Client Profiles' && <ClientProfile />}

          {activeSection === 'Company Details' && <CompanyDetails />}
        </div>
      </div>
    </div>
  );
}

export default App;
