import React, { useState, useEffect } from 'react';
import * as apiService from '../../services/apiService';
import './AdminPages.css';

const OfficerManagement = () => {
  const [officers, setOfficers] = useState([]);
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}
      </div>
    </div>
  );
};

export default OfficerManagement;
