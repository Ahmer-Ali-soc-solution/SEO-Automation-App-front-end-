import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OnboardingForm.css';
import trashIcon from '../assets/images/trash.svg';
import mapIcon from '../assets/images/map-icon.svg';

function OnboardingForm() {
  const navigate = useNavigate();


  const [companyName, setCompanyName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [aboutBusiness, setAboutBusiness] = useState('');
  const [packageId] = useState(() => {
    const stored = localStorage.getItem('selectedPackageId');
    return stored ? parseInt(stored) : 1;
  });


  const [services, setServices] = useState([
    { name: 'Service 1', rank: true, keywords: ['keyword1', 'keyword2'] },
  ]);
  const [serviceAreas, setServiceAreas] = useState(['']);
  const [locations, setLocations] = useState([{ name: '', url: '' }]);


  const handleAddService = () => setServices([...services, { name: '', rank: true, keywords: [] }]);
  const handleAddServiceArea = () => setServiceAreas([...serviceAreas, '']);
  const handleAddLocation = () => setLocations([...locations, { name: '', url: '' }]);
  const handleDeleteLocation = (indexToRemove) =>
    setLocations(locations.filter((_, i) => i !== indexToRemove));


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');

    if (!token) {
      alert('You must be logged in to submit.');
      navigate('/login');
      return;
    }

    const payload = {
      company_name: companyName,
      phone_number: phoneNumber,
      address: address,
      email: email,
      about_business: aboutBusiness,
      package: packageId,
      services: services.map(service => ({
        service_name: service.name,
        rank_check: service.rank,
        keywords: service.keywords.map(keyword => ({ keyword })),
      })),
      service_areas: serviceAreas.map(area => ({ area_name: area })),
      business_locations: locations.map(loc => ({
        location_name: loc.name,
        location_url: loc.url,
      })),
    };

    try {
      const response = await fetch('http://localhost:8010/proxy/seo/onboarding/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Submitted successfully");
        localStorage.removeItem('selectedPackageId');
        navigate('/dashboard');
      } else {
        const error = await response.text();
        console.error("Submission failed:", error);
      }
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="onboarding-container">
      <div className="onboarding-back" onClick={() => navigate(-1)}>← Onboarding form</div>

      <form onSubmit={handleSubmit} className="onboarding-form">

        {/*Company Info */}
        <div className="form-grid">
          <div>
            <label>Company Name<span className='required'>*</span></label>
            <input type="text" required value={companyName} onChange={e => setCompanyName(e.target.value)} />
          </div>
          <div>
            <label>Phone Number<span className='required'>*</span></label>
            <input type="text" required value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
          </div>
          <div>
            <label>Address<span className='required'>*</span></label>
            <input type="text" required value={address} onChange={e => setAddress(e.target.value)} />
          </div>
          <div>
            <label>Email<span className='required'>*</span></label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label>About your business<span className='required'>*</span></label>
          <textarea required value={aboutBusiness} onChange={e => setAboutBusiness(e.target.value)} />
        </div>

        {/*Services */}
        <div className="form-group">
          <label>Services you offer<span className='required'>*</span></label>
          <table className="service-table">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Rank</th>
                <th>Keywords</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, i) => (
                <tr key={i}>
                  <td>
                    <input type="text" value={service.name} onChange={(e) => {
                      const updated = [...services];
                      updated[i].name = e.target.value;
                      setServices(updated);
                    }} />
                  </td>
                  <td>
                    <input type="checkbox" checked={service.rank} onChange={(e) => {
                      const updated = [...services];
                      updated[i].rank = e.target.checked;
                      setServices(updated);
                    }} />
                  </td>
                  <td>
                    <input type="text" placeholder="comma-separated" value={service.keywords.join(', ')} onChange={(e) => {
                      const updated = [...services];
                      updated[i].keywords = e.target.value.split(',').map(k => k.trim());
                      setServices(updated);
                    }} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="center-button">
            <button type="button" onClick={handleAddService}>Add Service +</button>
          </div>
        </div>

        {/*Service Areas */}
        <div className="form-group">
          <label>Service Areas</label>
          {serviceAreas.map((area, i) => (
            <div key={i} className="inline-input-group">
              <label>Area {i + 1}</label>
              <input type="text" value={area} onChange={(e) => {
                const updated = [...serviceAreas];
                updated[i] = e.target.value;
                setServiceAreas(updated);
              }} />
            </div>
          ))}
          <div className="center-button">
            <button type="button" onClick={handleAddServiceArea}>Add Area +</button>
          </div>
        </div>


        <div className="form-group">
          <label>Business Locations on Google<span className='required'>*</span></label>
          {locations.map((loc, i) => (
            <div key={i} className="location-row">
              <span className="location-index">{i + 1}</span>
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
                    const query = encodeURIComponent(loc.name || '');
                    if (!query) {
                      alert('Please enter a location name first.');
                      return;
                    }
                    const mapUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
                    window.open(mapUrl, '_blank');
                  }}
                >
                  <img src={mapIcon} alt="Map" className="map-icon" />
                  <span className="map-text">Open Maps</span>
                </button>
              </div>
              <button className="delete-button" type="button" onClick={() => handleDeleteLocation(i)}>
                <img src={trashIcon} alt="Delete" className="trash-icon" />
              </button>
            </div>
          ))}
          <div className="center-button">
            <button type="button" onClick={handleAddLocation}>Add Location +</button>
          </div>
        </div>


        <div className="form-submit">
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default OnboardingForm;