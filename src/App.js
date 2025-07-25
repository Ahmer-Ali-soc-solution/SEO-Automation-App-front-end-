import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import PricingPlan from './components/PricingPlan';
import OnboardingForm from './components/OnboardingForm';
import Dashboard from './components/Dashboard';
import ForgetPassword from './components/ForgetPassword';
import ResetPasswordPage from './components/ResetPasswordPage';



const stripePromise = loadStripe('pk_test_51QOxwTA8cYNy6kmA03l0GtjEQYkHSDtWkyRvqMJOKBVaA53BSs9ktAuA0EvadYQFA2GOAsXZRvsjp0aB5yMIucQk00xm8V6kCl');

function AppWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/pricing');
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
      <Route path="/forgot-password" element={<ForgetPassword />} />
      <Route path="/reset-password/:uid_token" element={<ResetPasswordPage />} />
      <Route path="/signup" element={<SignupPage onSignup={handleSignup} />} />
      <Route path="/pricing" element={<PricingPlan onContinue={() => navigate('/onboarding')} />} />
      <Route path="/onboarding" element={<OnboardingForm onFinish={() => navigate('/dashboard')} />} />
      <Route
        path="/dashboard"
        element={
          isLoggedIn ? (
            <Dashboard onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <Elements stripe={stripePromise}>
        <AppWrapper />
      </Elements>
    </Router>
  );
}
