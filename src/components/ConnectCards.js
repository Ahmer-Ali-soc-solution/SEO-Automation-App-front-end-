import React from 'react';
import GBP from '../assets/images/GBP.svg';
import WP from '../assets/images/WP.svg';
import './connectcards.css';  // <-- Import the separate CSS file here

const connectItems = [
  {
    title: 'Connect with Google Business Profile (GBP)',
    logo: GBP,
    button: 'Connect',
  },
  {
    title: 'Connect with WordPress Admin Dashboard',
    logo: WP,
    button: 'Connect',
  },
  {
    title: 'My Business Details',
    logo: WP,
    button: 'Connect',
  }
];

function ConnectCards() {
  return (
    <div className="connect-cards-wrapper">
      {connectItems.map((item, index) => (
        <div className="connect-card" key={index}>
          <div className="connect-card-header">
            <div className="connect-card-logo-container">
              <img src={item.logo} alt="logo" className="connect-card-logo" />
            </div>
            <span className="connect-card-title">{item.title}</span>
          </div>
          <div className="connect-card-footer">
            <button className="button-connect">{item.button}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ConnectCards;
