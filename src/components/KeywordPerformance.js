import React, { useState, useEffect } from 'react';

function KeywordPerformance() {
  const [keywordData, setKeywordData] = useState([]);

  // Dummy data to simulate API fetch
  useEffect(() => {
    const dummyData = [
      {
        keyword: 'Gutter Cleaning',
        clicks: '2,185',
        impressions: '52,721',
        ctr: '0.01661',
      },
      {
        keyword: 'Window Washing',
        clicks: '1,892',
        impressions: '47,102',
        ctr: '0.01578',
      },
      {
        keyword: 'Roof Repair Service',
        clicks: '2,010',
        impressions: '50,003',
        ctr: '0.01823',
      },
    ];
    setKeywordData(dummyData);
  }, []);

  return (
    <div className="service-areas-section">
      {/* Section Header */}
      <div className="service-areas-header">
        <h2>Keyword Performance <span className="count">({keywordData.length})</span></h2>
        <button className="view-all-btn">View All</button>
      </div>

      {/* Table */}
      <div className="service-table-section">
        {/* Table Header */}
        <div className="keyword-table-header">
          <div>Target Keyword + Service Area</div>
          <div>Clicks</div>
          <div>Impressions</div>
          <div>CTR</div>
        </div>

        {/* Table Rows */}
        {keywordData.map((item, index) => (
          <div className="keyword-table-row" key={index}>
            <div className="service-table-cell">{item.keyword}</div>
            <div className="service-table-cell">{item.clicks}</div>
            <div className="service-table-cell">{item.impressions}</div>
            <div className="service-table-cell">{item.ctr} </div>
          </div>
        ))}

        {/* Load More Button */}
        <div className="load-more-container">
          <button className="load-more-btn">Load More</button>
        </div>
      </div>
    </div>
  );
}

export default KeywordPerformance;
