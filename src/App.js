import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PricingPlan from './components/PricingPlan';
import OnboardingForm from './components/OnboardingForm';
import Dashboard from './components/Dashboard';



function AppWrapper() {
   // Read login state from localStorage on load
   const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const navigate = useNavigate();

  // When login succeeds
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // persist login
    navigate('/dashboard');
  };

  // When logout happens
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // clear login
    navigate('/login');
  };

  // Signup just navigates forward
  const handleSignup = () => {
    navigate('/pricing');
  }
  
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
      <Route path="/pricing" element={<PricingPlan onContinue={() => navigate('/onboarding')} />} />
      <Route path="/onboarding" element={<OnboardingForm onFinish={() => navigate('/dashboard')} />} />
      <Route path="/dashboard" element={isLoggedIn ? <Dashboard onLogout={() => {
        setIsLoggedIn(false);
        navigate('/login');
      }} /> : <Navigate to="/login" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
