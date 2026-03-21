import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import * as apiService from '../../services/apiService';
import './OfficerDashboard.css';

const OfficerDashboard = () => {
  const { user } = useContext(AuthContext);
  const [isRequesting, setIsRequesting] = useState(false);

  const modules = [
    {
      title: 'Manage Products',
      subtitle: 'Add, edit, and maintain your catalog',
      icon: 'PK',
      to: '/officer/products',
      statLabel: 'Catalog',
      statValue: 'Live Updates'
    },
    {
      title: 'Orders',
      subtitle: 'Accept and track customer purchases',
      icon: 'OR',
      to: '/officer/orders',
      statLabel: 'Pipeline',
      statValue: 'Real-time'
    },
    {
      title: 'Delivery',
      subtitle: 'Schedule, reschedule, and complete drops',
      icon: 'DL',
      to: '/officer/delivery',
      statLabel: 'Fulfillment',
      statValue: 'Route-ready'
    },
    {
      title: 'News & Promos',
      subtitle: 'Launch campaigns and product highlights',
      icon: 'NP',
      to: '/officer/news-promo',
      statLabel: 'Engagement',
      statValue: 'Campaigns'
    },
    {
      title: 'Daily History',
      subtitle: 'Review actions and export activity reports',
      icon: 'DH',
      to: '/officer/history',
      statLabel: 'Reports',
      statValue: 'Downloadable'
    }
  ];

  const handleRegisterAsAdmin = async () => {
    if (isRequesting) return;

    if (!window.confirm('Submit an admin access request for this officer account?')) {
      return;
    }

    try {
      setIsRequesting(true);
      await apiService.createAdminPromotionRequest();
      alert('Admin access request submitted. Please wait for admin approval.');
    } catch (err) {
      alert(err.response?.data?.message || 'Error submitting admin access request');
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <div className="officer-dashboard">
      <div className="container">
        <section className="officer-hero">
          <div className="officer-hero-content">
            <p className="officer-eyebrow">Operations Center</p>
            <h1>Officer Dashboard</h1>
            <p className="officer-hero-subtitle">
              Keep inventory accurate, process orders faster, and manage delivery workflows from one place.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <div className="officer-hero-badge">5 Core Modules</div>
            {user?.role === 'officer' && (
              <button
                onClick={handleRegisterAsAdmin}
                disabled={isRequesting}
                className="officer-module-link"
                style={{ border: 'none', cursor: isRequesting ? 'not-allowed' : 'pointer' }}
              >
                {isRequesting ? 'Submitting...' : 'Request Admin Access'}
              </button>
            )}
          </div>
        </section>

        <div className="officer-module-grid">
          {modules.map((module) => (
            <article key={module.title} className="officer-module-card">
              <div className="officer-module-top">
                <span className="officer-module-icon" aria-hidden="true">{module.icon}</span>
                <span className="officer-module-chip">{module.statLabel}</span>
              </div>
              <h3>{module.title}</h3>
              <p>{module.subtitle}</p>
              <div className="officer-module-bottom">
                <span className="officer-module-meta">{module.statValue}</span>
                <Link to={module.to} className="officer-module-link">
                  Open
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OfficerDashboard;
