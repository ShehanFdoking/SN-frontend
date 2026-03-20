import React, { useState } from 'react';
import * as apiService from '../../services/apiService';
import './AdminPages.css';

const ActivityReportPage = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      alert('Please select both dates');
      return;
    }

    try {
      setLoading(true);
      const response = await apiService.getOfficerActivitySummary({
        startDate,
        endDate
      });
      setSummary(response.data);
    } catch (err) {
      alert('Error generating report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page-shell">
      <div className="container">
        <section className="admin-page-hero">
          <div>
            <p className="admin-page-eyebrow">Analytics Center</p>
            <h1>Activity Reports</h1>
            <p>Generate performance reports by date range and review action patterns across the platform.</p>
          </div>
          <span className="admin-page-tag">Date Analytics</span>
        </section>

        <section className="admin-panel-card">
          <div className="admin-panel-head">
            <h3>Generate Report</h3>
            <span className="admin-panel-pill">Range-based metrics</span>
          </div>

          <div className="admin-report-filter-grid">
            <div className="form-group">
              <label>Start Date:</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>End Date:</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <button
              onClick={handleGenerateReport}
              disabled={loading}
              className="btn-primary"
              style={{ minHeight: '44px' }}
            >
              {loading ? 'Generating...' : 'Generate'}
            </button>
          </div>
        </section>

        {summary && (
          <>
            <div className="admin-stat-grid">
              <article className="admin-stat-card">
                <p>Total Activities</p>
                <h2>{summary.totalActivities || 0}</h2>
              </article>

              <article className="admin-stat-card">
                <p>Items Added</p>
                <h2>{summary.byAction?.add || 0}</h2>
              </article>

              <article className="admin-stat-card">
                <p>Items Edited</p>
                <h2>{summary.byAction?.edit || 0}</h2>
              </article>

              <article className="admin-stat-card">
                <p>Items Deleted</p>
                <h2>{summary.byAction?.delete || 0}</h2>
              </article>
            </div>

            <div className="admin-two-col-grid">
              <div className="admin-panel-card">
                <h3>Activity by Type</h3>
                <ul className="admin-list">
                  <li>Products: {summary.byEntityType?.product}</li>
                  <li>News: {summary.byEntityType?.news}</li>
                  <li>Promotions: {summary.byEntityType?.promotion}</li>
                  <li>Orders: {summary.byEntityType?.order}</li>
                </ul>
              </div>

              <div className="admin-panel-card">
                <h3>Activity by Action</h3>
                <ul className="admin-list">
                  <li>Added: {summary.byAction?.add}</li>
                  <li>Edited: {summary.byAction?.edit}</li>
                  <li>Deleted: {summary.byAction?.delete}</li>
                  <li>Viewed: {summary.byAction?.view}</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivityReportPage;
