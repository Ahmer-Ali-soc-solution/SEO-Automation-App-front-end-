import React, { useState } from "react";
import "./ManageServices.css";

const ManageServices = () => {
  const [services, setServices] = useState({
    serviceArea: true,
    autoReview: true,
    blogWriting: true,
    autoGBP: true,
  });

  const toggleService = (key) => {
    setServices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="manage-services-container">
      <h3 className="manage-services-title">Manage Services</h3>

      <div className="manage-services-inner">
        <div className="services-grid">
          {/* Left column */}
          <div className="services-column">
            <ServiceToggle
              label="Service Area Page Creation & Management"
              isActive={services.serviceArea}
              onToggle={() => toggleService("serviceArea")}
            />
            <ServiceToggle
              label="Auto Review Responses"
              isActive={services.autoReview}
              onToggle={() => toggleService("autoReview")}
            />
          </div>

          {/* Right column */}
          <div className="services-column">
            <ServiceToggle
              label="Blog Writing"
              isActive={services.blogWriting}
              onToggle={() => toggleService("blogWriting")}
            />
            <ServiceToggle
              label="Auto GBP Posts"
              isActive={services.autoGBP}
              onToggle={() => toggleService("autoGBP")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceToggle = ({ label, isActive, onToggle }) => (
  <div className="service-toggle">
    <span className="service-label">{label}</span>
    <label className="toggle-label">
      <input
        type="checkbox"
        checked={isActive}
        onChange={onToggle}
        className="toggle-input"
      />
      <span className={`toggle-slider ${isActive ? "active" : ""}`}></span>
    </label>
  </div>
);

export default ManageServices;
