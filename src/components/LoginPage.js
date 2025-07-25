import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import handshakeImage from '../assets/images/handshake.png';
import appleIcon from '../assets/images/apple-icon.svg';
import googleIcon from '../assets/images/google-icon.svg';

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // const response = await fetch('http://51.21.149.16/auth/login/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     email,
      //     password,
      //   }),
      // });
      const response = await fetch('http://localhost:8010/proxy/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.token && data.token.access) {
       
        localStorage.setItem('accessToken', data.token.access);
        localStorage.setItem('refreshToken', data.token.refresh);
        
        if (onLogin) {
          onLogin(); 
        } else {
          navigate('/dashboard'); 
        }
      } else {
        alert(data.detail || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('An error occurred during login. Please try again.');
    }
  };

  //   if (email === 'admin@example.com' && password === 'password') {
  //     onLogin();
  //   } else {
  //     alert('Invalid credentials');
  //   }
  // };

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
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>

          <button type="submit" className="login-button">Login</button>

          <div className="signup-text">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
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
