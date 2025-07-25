import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmUpgradeModal from './ConfirmUpgradeModal';
import './PricingPlan.css';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51QOxwTA8cYNy6kmA03l0GtjEQYkHSDtWkyRvqMJOKBVaA53BSs9ktAuA0EvadYQFA2GOAsXZRvsjp0aB5yMIucQk00xm8V6kCl');

function PricingPlan() {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      title: 'Pro',
      monthly: 49,
      yearly: 39,
      package_id: 1,
      features: ['Everything in Free plus', 'Remove branding', 'Send emails from aliases', 'Review document blocks', 'Request multiple signatures'],
    },
    {
      title: 'Team',
      monthly: 129,
      yearly: 99,
      package_id: 2,
      features: ['Everything in Pro plus', 'Remove branding', 'Send emails from aliases', 'Review document blocks', 'Request multiple signatures'],
    },
    {
      title: 'Enterprise',
      monthly: 'Custom',
      yearly: 'Custom',
      package_id: 3,
      features: ['Remove branding', 'Send emails from aliases', 'Review document blocks', 'Request multiple signatures'],
    },
  ];

  const handleUpgradeClick = (plan) => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Please login first.');
      navigate('/login');
      return;
    }

    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handlePaymentSuccess = () => {
    alert('Payment succeeded! Redirecting to onboarding...');
    setShowModal(false);
    navigate('/onboarding');
  };

  const handlePaymentError = (msg) => {
    alert(`Payment failed: ${msg}`);
    navigate('/onboarding');
  };

  return (
    <div className="pricing-container">
      <div className="pricing-back" onClick={() => navigate(-1)}>
        ← Our Pricing Plans
      </div>

      {/* Toggle Monthly/Yearly */}
      <div className="pricing-toggle-container">
        <span className={!isYearly ? 'active-cycle' : ''} onClick={() => setIsYearly(false)}>Monthly</span>
        <label className="switch">
          <input type="checkbox" checked={isYearly} onChange={() => setIsYearly(!isYearly)} />
          <span className="slider"></span>
        </label>
        <span className={isYearly ? 'active-cycle' : ''} onClick={() => setIsYearly(true)}>Yearly</span>
        {isYearly && (
          <>
            <span className="save-badge">Save 20%</span>
            <span className="save-text">with annual subscriptions</span>
          </>
        )}
      </div>

      {/* Cards */}
      <div className="pricing-cards">
        {plans.map((plan, index) => (
          <div key={index} className="pricing-card">
            <h3>{plan.title}</h3>
            <p className="pricing-subtitle">For individuals just getting started</p>
            <p className="pricing-price">
              {typeof plan.monthly === 'number'
                ? `$${isYearly ? plan.yearly : plan.monthly}.00`
                : 'Custom'}
              {plan.title !== 'Enterprise' && <span className="pricing-per-month">/month</span>}
            </p>
            <button className="pricing-upgrade-btn" onClick={() => handleUpgradeClick(plan)}>
              Upgrade
            </button>
            <div className="pricing-includes">
              <p>What's included?</p>
              <ul>
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Confirm Upgrade Modal */}
      <Elements stripe={stripePromise}>
        <ConfirmUpgradeModal
          isOpen={showModal}
          selectedPlan={selectedPlan}
          onClose={() => setShowModal(false)}
          onSuccess={handlePaymentSuccess}
          onError={handlePaymentError}
        />
      </Elements>
    </div>
  );
}

export default PricingPlan;