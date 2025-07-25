import React, { useEffect, useState } from 'react';
import './ServicesAreas.css';

function ServiceAreas() {
  const [services, setServices] = useState([]);

  
  useEffect(() => {
    // Dummy data
    const dummyData = [
      {
        id: 1,
        title: 'Full-stack developer',
        description: 'Tellus orci pretium et quis aliquam... A in risus tincidunt sed bibendum auctor in mi elnon enim ultricies...',
        postedOn: 'Mar 25, 2025',
        clicks: 1601
      },
      {
        id: 2,
        title: 'Full-stack developer',
        description: 'Metus non enim ultricies elit etiam tristique nunc interdum...',
        postedOn: 'Feb 10, 2025',
        clicks: 1601
      },
      {
        id: 3,
        title: 'Full-stack developer',
        description: 'Metus non enim ultricies elit etiam tristique nunc interdum...',
        postedOn: 'Jan 15, 2025',
        clicks: 1601
      }
    ];

    
    setTimeout(() => {
      setServices(dummyData);
    }, 500);
  }, []);

  return (
    <div className="service-areas-section">
      {/* Section Header */}
      <div className="service-areas-header">
        <h2>Services Areas <span className="count">({services.length})</span></h2>
        <button className="view-all-btn">View All</button>
      </div>

      {/* Table Section */}
      <div className="service-table-section">
        <div className="service-table-header">
          <div>Service Area</div>
          <div>Description</div>
          <div>Posted On</div>
          <div>Total Clicks</div>
        </div>

        {/* Table Rows */}
        {services.map((service) => (
            <div className="service-table-row" key={service.id}>
            <div className="service-table-cell">{service.title}</div>
            <div className="service-table-cell">{service.description}</div>
            <div className="service-table-cell">{service.postedOn}</div>
            <div className="service-table-cell">
                  {service.clicks.toLocaleString()}
                  <span className="arrow-icon">›</span>
            </div>
          </div>
        ))}


        {/* Load More Button */}
        <div className="load-more-container">
          <button className="load-more-btn">Load More</button>
        </div>
      </div>
    </div>
  );
}

export default ServiceAreas;
