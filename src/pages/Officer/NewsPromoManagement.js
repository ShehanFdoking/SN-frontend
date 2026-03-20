import React, { useState } from 'react';
import * as apiService from '../../services/apiService';

const NewsPromoManagement = () => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    type: 'news',
    discountPercentage: ''
  });
  const [loading, setLoading] = useState(false); // eslint-disable-line no-unused-vars

  const handleCreateNewsPromo = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await apiService.createNewsPromo(formData);
      setFormData({
        title: '',
        content: '',
        image: '',
        type: 'news',
        discountPercentage: ''
      });
      setShowForm(false);
      alert('News/Promo created');
    } catch (err) {
      alert('Error creating news/promo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>Manage News & Promotions</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
            style={{ padding: '10px 20px' }}
          >
            {showForm ? 'Cancel' : 'Add News/Promo'}
          </button>
        </div>

        {showForm && (
          <div className="card" style={{ marginBottom: '30px' }}>
            <h3>Create News or Promotion</h3>
            <form onSubmit={handleCreateNewsPromo}>
              <div className="form-group">
                <label>Type:</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  required
                >
                  <option value="news">News</option>
                  <option value="promotion">Promotion</option>
                </select>
              </div>

              <div className="form-group">
                <label>Title:</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label>Content:</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label>Image URL:</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              {formData.type === 'promotion' && (
                <div className="form-group">
                  <label>Discount Percentage:</label>
                  <input
                    type="number"
                    value={formData.discountPercentage}
                    onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                  />
                </div>
              )}

              <button type="submit" className="btn-primary" style={{ padding: '10px 20px' }}>
                Create
              </button>
            </form>
          </div>
        )}

        <div className="card">
          <p>Your news and promotions will appear on the news page for all users.</p>
        </div>
      </div>
    </div>
  );
};

export default NewsPromoManagement;
