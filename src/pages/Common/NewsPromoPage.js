import React, { useState, useEffect } from 'react';
import * as apiService from '../../services/apiService';

const NewsPromoPage = () => {
  const [newsPromos, setNewsPromos] = useState([]);
  const [filter, setFilter] = useState({ type: '', page: 1, limit: 10 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNewsPromos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchNewsPromos = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllNewsAndPromos(filter);
      setNewsPromos(response.data.newsPromos);
    } catch (err) {
      console.error('Error fetching news/promos:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <h1 style={{ marginBottom: '30px' }}>News & Promotions</h1>

        <div style={{ marginBottom: '30px' }}>
          <select
            value={filter.type}
            onChange={(e) => setFilter({ ...filter, type: e.target.value, page: 1 })}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          >
            <option value="">All</option>
            <option value="news">News</option>
            <option value="promotion">Promotions</option>
          </select>
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : newsPromos.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '30px' }}>
            {newsPromos.map((item) => (
              <div key={item._id} className="card">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '5px', marginBottom: '15px' }}
                  />
                )}
                <div style={{ display: 'inline-block', marginBottom: '10px' }}>
                  <span className={`badge ${item.type === 'promotion' ? 'badge-warning' : 'badge-info'}`}>
                    {item.type}
                  </span>
                </div>
                <h3>{item.title}</h3>
                <p>{item.content}</p>
                {item.discountPercentage && (
                  <p style={{ color: '#dc3545', fontWeight: 'bold', fontSize: '16px' }}>
                    💰 {item.discountPercentage}% Discount
                  </p>
                )}
                <p style={{ fontSize: '12px', color: '#999' }}>
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-success">
            No news or promotions available at the moment.
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsPromoPage;
