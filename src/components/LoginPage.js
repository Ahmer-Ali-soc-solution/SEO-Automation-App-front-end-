import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Keep this line
import './LoginPage.css';
import handshakeImage from '../assets/images/handshake.png';
import appleIcon from '../assets/images/apple-icon.svg';
import googleIcon from '../assets/images/google-icon.svg';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'admin@example.com' && password === 'password') {
      onLogin();
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div
        className="login-image"
        style={{ backgroundImage: `url(${handshakeImage})` }}
      />

      <div className="login-form-wrapper">
        <form onSubmit={handleLogin} className="login-form">
          <h2>Login</h2>

          <label className="input-label">
            Email<span className="required-star">*</span>
          </label>
          <input
            type="email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="input-label">
            Password<span className="required-star">*</span>
          </label>
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="forgot-password">
            <a href="#">Forget Password?</a>
          </div>

          <button type="submit" className="login-button">Login</button>

          <div className="signup-text">
            Don’t have an account? <Link to="/pricing">Sign Up</Link>
          </div>

          <div className="or-separator">
            <hr />
            <span>OR</span>
          </div>

          <div className="social-buttons">
            <button type="button" className="social-button">
              <img src={googleIcon} alt="Google" />
            </button>
            <button type="button" className="social-button apple">
              <img src={appleIcon} alt="Apple" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
