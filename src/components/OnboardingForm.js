import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingForm.css';
import trashIcon from '../assets/images/trash.svg'
import mapIcon from '../assets/images/map-icon.svg';


function OnboardingForm() {
  const navigate = useNavigate();

  const [services, setServices] = useState([
    { name: 'Service 1', rank: true, keywords: ['keyword1', 'keyword2'] },
  ]);

  const [serviceAreas, setServiceAreas] = useState(['']);
  const [locations, setLocations] = useState([{ name: '', url: '' }]);

  const handleAddService = () => {
    setServices([...services, { name: '', rank: true, keywords: [] }]);
  };

  const handleAddServiceArea = () => {
    setServiceAreas([...serviceAreas, '']);
  };

  const handleAddLocation = () => {
    setLocations([...locations, { name: '', url: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  const handleDeleteLocation = (indexToRemove) => {
    const updated = locations.filter((_, i) => i !== indexToRemove);
    setLocations(updated);
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-back" onClick={() => navigate(-1)}>
        ← Onboarding form
      </div>

      <form onSubmit={handleSubmit} className="onboarding-form">
        {/* Company Info */}
        <div className="form-grid">
            <div>
              <label>Official company name<span className='required'>*</span></label>
              <input type="text" required />
            </div>
            <div>
              <label>Official company phone no.<span className='required'>*</span></label>
              <input type="text" required />
            </div>
            <div>
              <label>Official company Address<span className='required'>*</span></label>
              <input type="text" required />
            </div>
            <div>
              <label>Official company Email<span className='required'>*</span></label>
              <input type="email" required />
            </div>
          </div>


        {/* Business Description */}
        <div className="form-group">
          <label>About your business<span className='required'>*</span></label>
          <textarea required></textarea>
        </div>

        {/* Services Table */}
        <div className="form-group">
          <label>List all services you offer<span className='required'>*</span></label>
          <table className="service-table">
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
                  <td>
                    <input
                      type="text"
                      value={service.name}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[i].name = e.target.value;
                        setServices(updated);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      checked={service.rank}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[i].rank = e.target.checked;
                        setServices(updated);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      placeholder="comma-separated keywords"
                      value={service.keywords.join(', ')}
                      onChange={(e) => {
                        const updated = [...services];
                        updated[i].keywords = e.target.value.split(',').map(k => k.trim());
                        setServices(updated);
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="center-button">
            <button type="button" onClick={handleAddService}>Add Service +</button>
          </div>
        </div>

                {/* Service Areas */}
          <div className="form-group">
            <label>List all service areas you want to rank for and optimize</label>
            {serviceAreas.map((area, i) => (
              <div key={i} className="inline-input-group">
                <label className="inline-label">Service Area {i + 1}:</label>
                <input
                  type="text"
                  value={area}
                  onChange={(e) => {
                    const updated = [...serviceAreas];
                    updated[i] = e.target.value;
                    setServiceAreas(updated);
                  }}
                  placeholder={`Enter service area ${i + 1}`}
                />
              </div>
            ))}
            <div className="center-button">
              <button type="button" onClick={handleAddServiceArea}>Add Service Area +</button>
            </div>
          </div>


       {/* Locations Section */}
          <div className="form-group">
            <label>How many business locations do you have on Google?*</label>

            {/* Loop through each location */}
            {locations.map((loc, i) => (
              <div key={i} className="location-row">
                {/*  Location index number */}
                <span className="location-index">{i + 1}</span>

                {/*  Location Name input */}
                <input
                  type="text"
                  placeholder="Location Name"
                  value={loc.name}
                  onChange={(e) => {
                    const updated = [...locations];
                    updated[i].name = e.target.value;
                    setLocations(updated);
                  }}
                />
                {/*  Location URL with map icon inside input */}
                  <div className="input-with-button">
                    <input
                      type="url"
                      placeholder="Location URL"
                      value={loc.url}
                      onChange={(e) => {
                        const updated = [...locations];
                        updated[i].url = e.target.value;
                        setLocations(updated);
                      }}
                    />
                    <button
                      type="button"
                      className="map-button"
                      onClick={() => {
                        const updated = [...locations];
                        updated[i].url = 'https://www.google.com/maps';
                        setLocations(updated);
                      }}
                      aria-label="Insert Map URL"
                    >
                      <img src={mapIcon} alt="Map Icon" className="map-icon" />
                      <span className="map-text">Open Maps</span>
                    </button>
                  </div>

                {/*  Delete location button */}
                <button
                  className="delete-button"
                  type="button"
                  onClick={() => handleDeleteLocation(i)}
                  aria-label="Delete Location"
                >
                  <img src={trashIcon} alt="Delete" className="trash-icon" />
                </button>
              </div>
            ))}

            {/*  Add Location button */}
            <div className="center-button">
              <button type="button" onClick={handleAddLocation}>
                Add Location +
              </button>
            </div>
          </div>



        {/* Submit */}
        <div className="form-submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default OnboardingForm;
