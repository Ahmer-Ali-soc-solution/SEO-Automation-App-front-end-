import React, { useState, useEffect } from 'react';

function ClientProfile() {
  // Dummy data now; replace this with API data later
  const [clients, setClients] = useState([]);

  useEffect(() => {
    // Simulated data fetch (this would be a fetch call to API later)
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
    <div className="service-areas-section">
    <div className="service-areas-header">
      <h2>Services Areas <span className="count">(16)</span></h2>
      <button className="view-all-btn">View All</button>
    </div>

    <div className="services-table">
      {/* Table Header */}
      <div className="services-table-header">
        <div>Client Name</div>
        <div>Email Address</div>
        <div>Phone No.</div>
        <div>GBP Status</div>
        <div>WP Status</div>
      </div>

      {/* Table Rows */}
      {clients.map((client, index) => (
        <div className="service-row" key={index}>
          <div className="service-cell">{client.name}</div>
          <div className="service-cell">{client.email}</div>
          <div className="service-cell">{client.phone}</div>
          <div className="service-cell connected">{client.gbpStatus}</div>
          <div className="service-cell connected">{client.wpStatus}</div>
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
