import React, { useState } from 'react';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import handshakeImage from '../assets/images/handshake.png';
import appleIcon from '../assets/images/apple-icon.svg';
import googleIcon from '../assets/images/google-icon.svg';

function SignupPage({ onSignup }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://localhost:8010/proxy/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        email,
        password,
        password2: confirmPassword, 
        first_name: firstName,
        last_name: lastName,
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
  
  localStorage.setItem('accessToken', data.token.access);
  localStorage.setItem('refreshToken', data.token.refresh);
  localStorage.setItem('isLoggedIn', 'true');

  alert("Signup successful!");
  if (onSignup) {
    onSignup(); 
  }
} 
      
      else {
        const errorMsg =
        data.detail ||
        Object.values(data).flat().join('\n') || // Collect errors if in { field: [msg] }
        'Signup failed. Please check your input.';
      alert(errorMsg);
      }
    } catch (error) {
      setLoading(false);
      console.error("Signup error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-image" style={{ backgroundImage: `url(${handshakeImage})` }} />

      <div className="login-form-wrapper">
        <form onSubmit={handleSignup} className="login-form">
          <h2>Sign Up</h2>

          <label className="input-label">First Name<span className="required-star">*</span></label>
          <input type="text" className="login-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />

          <label className="input-label">Last Name<span className="required-star">*</span></label>
          <input type="text" className="login-input" value={lastName} onChange={(e) => setLastName(e.target.value)} required />

          <label className="input-label">Email<span className="required-star">*</span></label>
          <input type="email" className="login-input" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label className="input-label">Password<span className="required-star">*</span></label>
          <input type="password" className="login-input" value={password} onChange={(e) => setPassword(e.target.value)} required />

          <label className="input-label">Confirm Password<span className="required-star">*</span></label>
          <input type="password" className="login-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          <div className="signup-text">
            Already have an account? <Link to="/login">Login</Link>
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

export default SignupPage;
