import React, { useState } from 'react';
import GBP from '../assets/images/GBP.svg';
import WP from '../assets/images/WP.svg';
import WordPressConnectModal from './WordPressConnectModal'; 
import './connectcards.css';

const connectItems = [
  {
    id: 'gbp',
    title: 'Connect with Google Business Profile (GBP)',
    logo: GBP,
    button: 'Connect',
  },
  {
    id: 'wordpress',
    title: 'Connect with WordPress Admin Dashboard',
    logo: WP,
    button: 'Connect',
  },
  {
    id: 'details',
    title: 'My Business Details',
    logo: WP,
    button: 'Connect',
  },
];

function ConnectCards() {
  const token = localStorage.getItem('accessToken'); 
  
  const [showModal, setShowModal] = useState(false);

  const connectToWordPress = async (credentials) => {
  try {
    const baseURL = 'http://51.21.149.16';
    const token = localStorage.getItem('accessToken');
   
    
    const response = await fetch(`${baseURL}/seo/connect_wp/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(credentials),
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Successfully connected to WordPress:', result);
      verifyWordPressConnection(); 
    } else {
      console.error('Connection failed:', result);
    }
  } catch (error) {
    console.error('Error connecting:', error);
  }
};


  const verifyWordPressConnection = async () => {
  try {
    const token = localStorage.getItem('accessToken'); 

    const response = await fetch('http://51.21.149.16/seo/verify_wp_connection/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    const result = await response.json();

    if (response.ok) {
      console.log('WordPress verification result:', result);
      
    } else {
      console.error('Verification failed:', result);
    }
  } catch (error) {
    console.error('Error verifying connection:', error);
  }
};

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
            <button
              className="button-connect"
              onClick={() => {
                if (item.id === 'wordpress') {
                  setShowModal(true);
                } else {
                  console.log(`${item.title} clicked`);
                }
              }}
            >
              {item.button}
            </button>
          </div>
        </div>
      ))}

      
      <WordPressConnectModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(data) => connectToWordPress(data)}
      />
    </div>
  );
}

export default ConnectCards;