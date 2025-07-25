import React, { useState } from 'react';
import './CompanyDetails.css';

// Dummy "API" data
const mockData = {
  companyInfo: {
    name: 'Name goes here',
    phone: '+1 234 567 8901',
    address: 'St. 22, Main BLVD.',
    email: 'name@gmail.com',
  },
  services: [
    {
      name: 'Service 1',
      ranked: true,
      keywords: ['keyword 1', 'keyword 2', 'keyword 3'],
    },
    {
      name: 'Service 2',
      ranked: false,
      keywords: ['keyword 4', 'keyword 5'],
    },
    {
      name: 'Service 3',
      ranked: true,
      keywords: ['keyword 6'],
    },
  ],
  serviceAreas: [
    'Service Area 1',
    'Service Area 2',
    'Service Area 3',
    'Primary Location 1',
    'Primary Location 2',
    'Primary Location 3',
    'Primary Location 4',
  ]
};

function CompanyDetails() {
  const [companyInfo, setCompanyInfo] = useState(mockData.companyInfo);
  const [services, setServices] = useState(mockData.services);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyInfo({ ...companyInfo, [name]: value });
  };

  const toggleRank = (index) => {
    const updated = [...services];
    updated[index].ranked = !updated[index].ranked;
    setServices(updated);
  };

  return (
    <div className="section-container">
      <div className="section-header">
        <h2>Manage Services</h2>
        <button className="edit-button" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Save' : 'Edit Details'}
        </button>
      </div>

      {/* Editable Info */}
      <div className="info-grid">
        <div className="info-box">
          <p className="info-label">OFFICIAL COMPANY NAME</p>
          <input
            type="text"
            name="name"
            value={companyInfo.name}
            onChange={handleInputChange}
            className="input-field"
            disabled={!isEditing}
          />
        </div>
        <div className="info-box">
          <p className="info-label">OFFICIAL COMPANY PHONE NO.</p>
          <input
            type="text"
            name="phone"
            value={companyInfo.phone}
            onChange={handleInputChange}
            className="input-field"
            disabled={!isEditing}
          />
        </div>
        <div className="info-box">
          <p className="info-label">OFFICIAL COMPANY ADDRESS</p>
          <input
            type="text"
            name="address"
            value={companyInfo.address}
            onChange={handleInputChange}
            className="input-field"
            disabled={!isEditing}
          />
        </div>
        <div className="info-box">
          <p className="info-label">OFFICIAL COMPANY EMAIL</p>
          <input
            type="text"
            name="email"
            value={companyInfo.email}
            onChange={handleInputChange}
            className="input-field"
            disabled={!isEditing}
          />
        </div>
      </div>

      {/* Dynamic Table */}
      <div className="table-container">
        <p className="info-label">LIST ALL SERVICES YOU OFFER</p>
        <table className="custom-table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Rank this service</th>
              <th>Target Keyword</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, i) => (
              <tr key={i}>
                <td>{service.name}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={service.ranked}
                    onChange={() => toggleRank(i)}
                    disabled={!isEditing}
                  />
                </td>
                <td className="keyword-cell">
                  {service.keywords.map((kw, idx) => (
                    <span key={idx} className="keyword-tag">{kw}</span>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Service Areas */}
      <div className="area-wrapper">
        <div className="service-row">
          {mockData.serviceAreas.slice(0, 3).map((label, i) => (
            <div className="info-box service-box" key={i}>
              <p className="info-label">{label.toUpperCase()}</p>
              <p className="info-value">area 1, area 2, area 3</p>
            </div>
          ))}
        </div>

        {/*  Primary Locations  */}
        <div className="location-grid">
          {mockData.serviceAreas.slice(3).map((label, i) => (
            <div className="info-box" key={i + 3}>
              <p className="info-label">{label.toUpperCase()}</p>
              <p className="info-value">-</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompanyDetails;
