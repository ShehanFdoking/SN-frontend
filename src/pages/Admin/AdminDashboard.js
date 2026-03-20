import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as apiService from '../../services/apiService';
import './AdminPages.css';

const AdminDashboard = () => {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAdminDashboard();
      setDashboard(response.data);
    } catch (err) {
      console.error('Error fetching dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div className="admin-page-shell">
      <div className="container">
        <section className="admin-page-hero">
          <div>
            <p className="admin-page-eyebrow">Control Tower</p>
            <h1>Admin Dashboard</h1>
            <p>Monitor platform health, manage officers, and oversee operations from one command center.</p>
          </div>
          <span className="admin-page-tag">System Overview</span>
        </section>

        {dashboard && (
          <>
            <div className="admin-stat-grid">
              <article className="admin-stat-card">
                <p>Total Users</p>
                <h2>{dashboard.summary?.totalUsers || 0}</h2>
              </article>

              <article className="admin-stat-card">
                <p>Total Officers</p>
                <h2>{dashboard.summary?.totalOfficers || 0}</h2>
              </article>

              <article className="admin-stat-card">
                <p>Total Admins</p>
                <h2>{dashboard.summary?.totalAdmins || 0}</h2>
              </article>
            </div>

            <div className="admin-action-grid">
              <article className="admin-action-card">
                <span className="admin-action-chip">Team Ops</span>
                <h3>Manage Officers</h3>
                <p>Add new officers and control active status in one place.</p>
                <Link to="/admin/officers" className="admin-action-link">Open</Link>
              </article>

              <article className="admin-action-card">
                <span className="admin-action-chip">Analytics</span>
                <h3>Activity Reports</h3>
                <p>Generate date-range reports and evaluate platform activity trends.</p>
                <Link to="/admin/reports" className="admin-action-link">Open</Link>
              </article>

              <article className="admin-action-card">
                <span className="admin-action-chip">Commerce</span>
                <h3>View Orders</h3>
                <p>Track customer orders and monitor fulfillment across the system.</p>
                <Link to="/orders" className="admin-action-link">Open</Link>
              </article>
            </div>

            {dashboard.officers && dashboard.officers.length > 0 && (
              <section className="admin-panel-card">
                <div className="admin-panel-head">
                  <h3>Officer Directory</h3>
                  <span className="admin-panel-pill">{dashboard.officers.length} total</span>
                </div>
                <table className="table admin-table-polish">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dashboard.officers.map((officer) => (
                      <tr key={officer._id}>
                        <td>{officer.firstName} {officer.lastName}</td>
                        <td>{officer.email}</td>
                        <td>
                          <span className={`badge ${officer.isActive ? 'badge-success' : 'badge-danger'}`}>
                            {officer.isActive ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
