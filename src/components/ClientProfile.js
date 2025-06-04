import React, { useState, useEffect } from 'react';
import './ClientProfile.css';

function ClientProfile() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const dummyData = Array(6).fill({
      name: 'Alex',
      email: 'alex@seo.com',
      phone: '+1 345 678 9012',
      gbpStatus: 'Connected',
      wpStatus: 'Connected',
    });
    setClients(dummyData);
  }, []);

  return (
    <div className="client-profile-section">
      <div className="client-profile-header">
        <h2>Client Profiles</h2>
        <button className="view-all-btn">View All</button>
      </div>

      <div className="client-profile-table">
        {/* Header */}
        <div className="client-profile-table-header">
          <div>Client Name</div>
          <div>Email Address</div>
          <div>Phone No.</div>
          <div>GBP Status</div>
          <div>WP Status</div>
        </div>

        {/* Rows */}
        {clients.map((client, index) => (
          <div className="client-profile-table-row" key={index}>
            <div className="client-profile-table-cell">{client.name}</div>
            <div className="client-profile-table-cell">{client.email}</div>
            <div className="client-profile-table-cell">{client.phone}</div>
            <div className="client-profile-table-cell">{client.gbpStatus}</div>
            <div className="client-profile-table-cell">{client.wpStatus}</div>
          </div>
        ))}

        {/* Load More */}
        <div className="load-more-container">
          <button className="load-more-btn">Load More</button>
        </div>
      </div>
    </div>
  );
}

export default ClientProfile;
