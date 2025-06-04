import React, { useState, useEffect } from 'react';
import sampleImg from '../assets/images/sample-blog.jpg'
import './ManageBlogs.css';

const ManageBlogs = () => {
  const blogs = [
    {
      title: "How to boost your website’s content using Semrush",
      excerpt: "Etiam ut fermentum posuere scelerisque amet.. Habit...",
      category: "Strategy",
      time: "1hr ago"
    },
    {
      title: "Top 5 content strategies in 2025",
      excerpt: "Aliquam at libero ut nulla facilisis convallis non ut leo...",
      category: "Marketing",
      time: "2hr ago"
    }
  ];

  return (
    <div className="manage-blogs-section">
  <div className="manage-blogs-header">
    <h3>Blogs ({blogs.length})</h3>
    <button className="view-all-btn">View All</button>
  </div>
  {blogs.map((blog, index) => (
    <div key={index} className="manage-blog-row">
      <img src={sampleImg} alt="Blog" className="manage-blog-image" />
      <div className="manage-blog-details">
        <div className="manage-blog-meta">
          <span className="manage-blog-category">{blog.category}</span>
          <span className="manage-blog-time">{blog.time}</span>
        </div>
        <div className="manage-blog-title">{blog.title}</div>
        <div className="manage-blog-excerpt">{blog.excerpt}</div>
        <div className="manage-blog-footer">
          <button className="manage-post-btn">Manage Post</button>
        </div>
      </div>
    </div>
  ))}
</div>

  );
};

export default ManageBlogs;
