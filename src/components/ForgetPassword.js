import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgetPassword.css';



function ForgetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log('Sending reset request for:', email);
      const response = await fetch('http://localhost:8010/proxy/auth/reset-password-email/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      // console.log('Response data:', data);
      if (response.ok) {
        alert('A password reset link has been sent to your email.');
      } else {
        alert(data.detail || 'Unable to send reset link. Please try again.');
      }
    } catch (err) {
      console.error('Reset error:', err);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="forget-container">
      <form onSubmit={handleSubmit} className="forget-form">
        <h2>Reset Your Password</h2>

        <label htmlFor="email">Email Address<span className="required">*</span></label>
        <input
          type="email"
          id="email"
          className="forget-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />

        <button type="submit" className="submit-button">Send Reset Link</button>

        <button
          type="button"
          className="back-button"
          onClick={() => navigate('/login')}
        >
          ⬅ Back to Login
        </button>
      </form>
    </div>
  );
}

export default ForgetPassword;