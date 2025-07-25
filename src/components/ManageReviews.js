import React, { useState, useEffect } from 'react';
import './ManageReviews.css';

const ManageReviews = () => {
  const reviews = [
    {
      user: 'James Z.',
      rating: '⭐⭐⭐⭐⭐',
      time: '2hr ago',
      comment: 'Very helpful and fast communication.'
    },
    {
      user: 'Sarah L.',
      rating: '⭐⭐⭐⭐',
      time: '4hr ago',
      comment: 'Great service and support. Recommended!'
    }
  ];

  return (
    <div className="service-areas-section">
      <div className="service-areas-header">
        <h3>Reviews ({reviews.length})</h3>
        <button className="view-all-btn">View All</button>
      </div>
      {reviews.map((review, index) => (
        <div key={index} className="review-item">
          <div className="review-name">{review.user}</div>
          <div className="review-meta">
            <span>{review.rating}</span> · <span>{review.time}</span>
          </div>
          <div className="review-comment">{review.comment}</div>
        </div>
      ))}
    </div>
  );
};

export default ManageReviews;
