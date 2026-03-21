import React, { useState, useEffect } from 'react';
import * as apiService from '../../services/apiService';
import './AdminPages.css';

const OfficerManagement = () => {
  const [officers, setOfficers] = useState([]);
  const [promotionRequests, setPromotionRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOfficers();
    fetchPromotionRequests();
  }, []);

  const fetchOfficers = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllOfficers();
      setOfficers(response.data);
    } catch (err) {
      console.error('Error fetching officers:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPromotionRequests = async () => {
    try {
      const response = await apiService.getAdminPromotionRequests({ status: 'pending' });
      setPromotionRequests(response.data || []);
    } catch (err) {
      console.error('Error fetching promotion requests:', err);
    }
  };

  const handleCreateOfficer = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await apiService.createOfficer(formData);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
      });
      setShowForm(false);
      fetchOfficers();
      alert('Officer created successfully');
    } catch (err) {
      alert('Error creating officer');
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivateOfficer = async (id) => {
    if (window.confirm('Deactivate this officer?')) {
      try {
        await apiService.deactivateOfficer(id);
        fetchOfficers();
      } catch (err) {
        alert('Error deactivating officer');
      }
    }
  };

  const handleReactivateOfficer = async (id) => {
    if (window.confirm('Reactivate this officer?')) {
      try {
        await apiService.reactivateOfficer(id);
        fetchOfficers();
      } catch (err) {
        alert('Error reactivating officer');
      }
    }
  };

  const handlePromoteToAdmin = async (request) => {
    const name = `${request.officerId?.firstName || ''} ${request.officerId?.lastName || ''}`.trim() || request.email;
    if (window.confirm(`Approve admin access request for ${name}?`)) {
      try {
        await apiService.approveAdminPromotionRequest(request._id);
        fetchPromotionRequests();
        fetchOfficers();
        alert('Admin access request approved successfully');
      } catch (err) {
        alert(err.response?.data?.message || 'Error approving admin request');
      }
    }
  };

  const handleRejectPromotionRequest = async (request) => {
    const name = `${request.officerId?.firstName || ''} ${request.officerId?.lastName || ''}`.trim() || request.email;
    if (window.confirm(`Reject admin access request for ${name}?`)) {
      try {
        await apiService.rejectAdminPromotionRequest(request._id, {
          note: 'Rejected by admin'
        });
        fetchPromotionRequests();
        alert('Admin access request rejected');
      } catch (err) {
        alert(err.response?.data?.message || 'Error rejecting admin request');
      }
    }
  };

  return (
    <div className="admin-page-shell">
      <div className="container">
        <section className="admin-page-hero admin-page-hero-compact">
          <div>
            <p className="admin-page-eyebrow">Team Management</p>
            <h1>Officer Management</h1>
            <p>Create officers, maintain account status, and keep the operations team aligned.</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : 'Add Officer'}
          </button>
        </section>

        {showForm && (
          <div className="admin-panel-card">
            <h3>Create New Officer</h3>
            <form onSubmit={handleCreateOfficer}>
              <div className="admin-form-grid">
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email:</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Password:</label>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary">
                Create Officer
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="spinner"></div>
        ) : (
          <>
            <section className="admin-panel-card" style={{ marginBottom: '20px' }}>
              <div className="admin-panel-head">
                <h3>Pending Admin Access Requests</h3>
                <span className="admin-panel-pill">{promotionRequests.length} pending</span>
              </div>
              {promotionRequests.length === 0 ? (
                <p style={{ margin: 0, color: '#6b7280' }}>No pending requests.</p>
              ) : (
                <table className="table admin-table-polish">
                  <thead>
                    <tr>
                      <th>Officer</th>
                      <th>Email</th>
                      <th>Requested At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {promotionRequests.map((request) => (
                      <tr key={request._id}>
                        <td>{request.officerId?.firstName} {request.officerId?.lastName}</td>
                        <td>{request.email}</td>
                        <td>{new Date(request.requestedAt).toLocaleString()}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            <button
                              onClick={() => handlePromoteToAdmin(request)}
                              className="btn-primary"
                              style={{ padding: '6px 10px', fontSize: '12px' }}
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleRejectPromotionRequest(request)}
                              className="btn-secondary"
                              style={{ padding: '6px 10px', fontSize: '12px' }}
                            >
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </section>

            <section className="admin-panel-card">
              <div className="admin-panel-head">
                <h3>Officers</h3>
                <span className="admin-panel-pill">{officers.length} members</span>
              </div>
              <table className="table admin-table-polish">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {officers.map((officer) => (
                    <tr key={officer._id}>
                      <td>{officer.firstName} {officer.lastName}</td>
                      <td>{officer.email}</td>
                      <td>{officer.phone}</td>
                      <td>
                        <span className={`badge ${officer.isActive ? 'badge-success' : 'badge-danger'}`}>
                          {officer.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                          {officer.isActive ? (
                            <button
                              onClick={() => handleDeactivateOfficer(officer._id)}
                              className="btn-secondary"
                              style={{ padding: '6px 10px', fontSize: '12px' }}
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              onClick={() => handleReactivateOfficer(officer._id)}
                              className="btn-primary"
                              style={{ padding: '6px 10px', fontSize: '12px' }}
                            >
                              Reactivate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default OfficerManagement;
