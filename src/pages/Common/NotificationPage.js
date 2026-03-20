import React, { useState, useEffect } from 'react';
import * as apiService from '../../services/apiService';

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await apiService.getMyNotifications({ limit: 50 });
      setNotifications(response.data.notifications);
      setUnreadCount(response.data.unreadCount);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (id) => {
    try {
      await apiService.markNotificationAsRead(id);
      fetchNotifications();
    } catch (err) {
      console.error('Error marking as read:', err);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await apiService.markAllNotificationsAsRead();
      fetchNotifications();
    } catch (err) {
      console.error('Error marking all as read:', err);
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      await apiService.deleteNotification(id);
      fetchNotifications();
    } catch (err) {
      console.error('Error deleting notification:', err);
    }
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h1>Notifications ({unreadCount} unread)</h1>
          {unreadCount > 0 && (
            <button onClick={handleMarkAllAsRead} className="btn-primary">
              Mark All as Read
            </button>
          )}
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : notifications.length > 0 ? (
          <div>
            {notifications.map((notification) => (
              <div
                key={notification._id}
                className="card"
                style={{
                  marginBottom: '15px',
                  borderLeft: `4px solid ${notification.isRead ? '#ddd' : '#007bff'}`,
                  backgroundColor: notification.isRead ? '#fff' : '#f0f7ff'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px 0' }}>{notification.title}</h3>
                    <p style={{ color: '#666', marginBottom: '8px' }}>{notification.message}</p>
                    <p style={{ fontSize: '12px', color: '#999' }}>
                      {new Date(notification.createdAt).toLocaleString()}
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: '10px' }}>
                    {!notification.isRead && (
                      <button
                        onClick={() => handleMarkAsRead(notification._id)}
                        className="btn-primary"
                        style={{ padding: '8px 12px', fontSize: '12px' }}
                      >
                        Mark Read
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteNotification(notification._id)}
                      className="btn-secondary"
                      style={{ padding: '8px 12px', fontSize: '12px' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="alert alert-success">
            No notifications yet!
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;
