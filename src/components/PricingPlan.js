import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PricingPlan.css';

function PricingPlan() {
  const navigate = useNavigate();
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      title: 'Pro',
      monthly: 49,
      yearly: 39,
      features: [
        'Everything in Free plus ✨',
        'Remove branding',
        'Send emails from aliases',
        'Review document blocks',
        'Request multiple signatures',
      ],
    },
    {
      title: 'Team',
      monthly: 129,
      yearly: 99,
      features: [
        'Everything in Pro plus ✨',
        'Remove branding',
        'Send emails from aliases',
        'Review document blocks',
        'Request multiple signatures',
      ],
    },
    {
      title: 'Enterprise',
      monthly: 'Custom',
      yearly: 'Custom',
      features: [
        'Remove branding',
        'Send emails from aliases',
        'Review document blocks',
        'Request multiple signatures',
      ],
    },
  ];

  const handleUpgrade = () => {
    navigate('/onboarding');
  };

  return (
    <div className="pricing-container">
      <div className="pricing-back" onClick={() => navigate(-1)}>
        ← Our Pricing Plans
      </div>

      {/* Toggle Switch */}
      <div className="pricing-toggle-container">
        <span className={!isYearly ? 'active-cycle' : ''} onClick={() => setIsYearly(false)}>
          Monthly
        </span>
        <label className="switch">
          <input
            type="checkbox"
            checked={isYearly}
            onChange={() => setIsYearly(!isYearly)}
          />
          <span className="slider"></span>
        </label>
        <span className={isYearly ? 'active-cycle' : ''} onClick={() => setIsYearly(true)}>
          Yearly
        </span>
        {isYearly && (
          <>
            <span className="save-badge">Save 20%</span>
            <span className="save-text">with annual subscriptions</span>
          </>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="pricing-cards">
        {plans.map((plan, i) => (
          <div key={i} className="pricing-card">
            <h3>{plan.title}</h3>
            <p className="pricing-subtitle">For individuals just getting started</p>
            <p className="pricing-price">
              {typeof plan.monthly === 'number'
                ? `$${isYearly ? plan.yearly : plan.monthly}.00`
                : 'Custom'}
              {plan.title !== 'Enterprise' && (
                <span className="pricing-per-month">/month</span>
              )}
            </p>
            <button onClick={handleUpgrade} className="pricing-upgrade-btn">
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
    </div>
  );
}

export default PricingPlan;
