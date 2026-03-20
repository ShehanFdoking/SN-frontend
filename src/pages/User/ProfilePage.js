import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import * as apiService from '../../services/apiService';

const ProfilePage = () => {
  const { user, setUser } = useContext(AuthContext);
  const [profile, setProfile] = useState(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });

  const handleProfileUpdate = async () => {
    try {
      setLoading(true);
      await apiService.updateUserProfile({
        firstName: profile.firstName,
        lastName: profile.lastName,
        phone: profile.phone,
        address: profile.address
      });
      setSuccess('Profile updated successfully');
      setUser(profile);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await apiService.changePassword({
        oldPassword: passwordForm.oldPassword,
        newPassword: passwordForm.newPassword
      });
      setSuccess('Password changed successfully');
      setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error changing password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <h1 style={{ marginBottom: '30px' }}>My Profile</h1>

        {error && <div className="alert alert-error" style={{ marginBottom: '20px' }}>{error}</div>}
        {success && <div className="alert alert-success" style={{ marginBottom: '20px' }}>{success}</div>}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
          {/* Profile Information */}
          <div className="card">
            <h3>Profile Information</h3>

            <div className="form-group">
              <label>First Name:</label>
              <input
                type="text"
                value={profile?.firstName || ''}
                onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Last Name:</label>
              <input
                type="text"
                value={profile?.lastName || ''}
                onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input type="email" value={profile?.email || ''} disabled />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input
                type="tel"
                value={profile?.phone || ''}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Role:</label>
              <input type="text" value={profile?.role || ''} disabled />
            </div>

            <button
              onClick={handleProfileUpdate}
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', marginTop: '20px' }}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>

          {/* Change Password */}
          <div className="card">
            <h3>Change Password</h3>

            <div className="form-group">
              <label>Old Password:</label>
              <input
                type="password"
                value={passwordForm.oldPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>New Password:</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password:</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              />
            </div>

            <button
              onClick={handlePasswordChange}
              disabled={loading}
              className="btn-primary"
              style={{ width: '100%', marginTop: '20px' }}
            >
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </div>

        {/* Delivery Address */}
        <div className="card" style={{ marginTop: '30px' }}>
          <h3>Delivery Address</h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            <div className="form-group">
              <label>Street:</label>
              <input
                type="text"
                value={profile?.address?.street || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  address: { ...profile?.address, street: e.target.value }
                })}
              />
            </div>

            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                value={profile?.address?.city || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  address: { ...profile?.address, city: e.target.value }
                })}
              />
            </div>

            <div className="form-group">
              <label>Postal Code:</label>
              <input
                type="text"
                value={profile?.address?.postalCode || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  address: { ...profile?.address, postalCode: e.target.value }
                })}
              />
            </div>

            <div className="form-group">
              <label>Country:</label>
              <input
                type="text"
                value={profile?.address?.country || ''}
                onChange={(e) => setProfile({
                  ...profile,
                  address: { ...profile?.address, country: e.target.value }
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
