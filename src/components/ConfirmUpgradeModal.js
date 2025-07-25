import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './ConfirmUpgradeModal.css';

const ConfirmUpgradeModal = ({ isOpen, onClose, selectedPlan, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen || !selectedPlan) return null;

  const handlePayment = async () => {
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) throw new Error('User not authenticated. Please log in again.');

      const response = await fetch('http://localhost:8010/proxy/payment/create-subscription/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          plan_name: selectedPlan.title,
          package_id: selectedPlan.package_id,
        }),
      });

      const rawText = await response.clone().text();
      console.log('Raw response from server:', rawText);
      const data = await response.json();

      if (data.error?.includes('UNIQUE constraint')) {
        onError('You already have an active subscription to this plan.');
        onClose();
        return;
      }

      if (!data.client_secret) throw new Error('No client_secret returned from backend');

      const result = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        onError(result.error.message);
        setLoading(false);
        return;
      }

      if (result.paymentIntent.status === 'succeeded') {
        onSuccess();
        onClose();
      } else {
        onError('Payment incomplete. Try again.');
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'Something went wrong');
      onError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Upgrade to {selectedPlan.title}</h2>
        <p>
          Are you sure you want to upgrade to the <strong>{selectedPlan.title}</strong> plan for{' '}
          <strong>
            {typeof selectedPlan.monthly === 'number' ? `$${selectedPlan.monthly}/mo` : 'Custom pricing'}
          </strong>
          ?
        </p>

        <div className="card-element-wrapper">
          <CardElement />
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="modal-actions">
          <button onClick={handlePayment} disabled={!stripe || loading}>
            {loading ? 'Processing...' : 'Continue to Payment'}
          </button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmUpgradeModal;