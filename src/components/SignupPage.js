import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();

  const handleSignup = () => {
    // Simulate successful signup
    navigate('/pricing');
  };

  return (
    <div>
      <h2>Signup Page</h2>
      <button onClick={handleSignup}>Continue to Pricing</button>
    </div>
  );
}

export default SignupPage;
