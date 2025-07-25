import React, { useState } from 'react';
import './WordPressConnectModal.css';


function WordPressConnectModal({ isOpen, onClose, onSubmit }) {
  const [siteUrl, setSiteUrl] = useState('');
  const [username, setUsername] = useState('');
  const [appPassword, setAppPassword] = useState('');

  const handleSubmit = () => {
    onSubmit({ site_url: siteUrl, username, app_password: appPassword });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Connect to WordPress</h3>
        <input value={siteUrl} onChange={(e) => setSiteUrl(e.target.value)} placeholder="Site URL" />
        <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
        <input value={appPassword} onChange={(e) => setAppPassword(e.target.value)} placeholder="Password" />
        <button onClick={handleSubmit}>Connect</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export default WordPressConnectModal;