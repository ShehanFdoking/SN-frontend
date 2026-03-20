import React, { useState, useEffect } from 'react';
import * as apiService from '../../services/apiService';
import './OfficerPages.css';

const DeliveryManagement = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({ status: '', limit: 50 });

  useEffect(() => {
    fetchDeliveries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchDeliveries = async () => {
    try {
      setLoading(true);
      const response = await apiService.getDeliveries(filter);
      setDeliveries(response.data.deliveries);
    } catch (err) {
      console.error('Error fetching deliveries:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="officer-page-shell">
      <div className="container">
        <section className="officer-page-hero officer-page-hero-compact">
          <div>
            <p className="officer-page-eyebrow">Fulfillment Board</p>
            <h1>Delivery Management</h1>
            <p>Track scheduled drops, monitor status progression, and keep delivery updates organized.</p>
          </div>
          <span className="officer-page-tag">Delivery Flow</span>
        </section>

        <section className="officer-panel-card officer-filter-row">
          <div>
            <p className="officer-filter-label">Filter by status</p>
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            >
              <option value="">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="in_transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
          </div>
          <span className="officer-panel-pill">{deliveries.length} records</span>
        </section>

        {loading ? (
          <div className="spinner"></div>
        ) : deliveries.length > 0 ? (
          <section className="officer-panel-card">
            <table className="table officer-table-polish">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Scheduled Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.map((delivery) => (
                  <tr key={delivery._id}>
                    <td>{delivery.orderId?.orderNumber}</td>
                    <td>{delivery.userId?.firstName}</td>
                    <td>{new Date(delivery.scheduledDate).toLocaleDateString()}</td>
                    <td>
                      <span className={`badge badge-${delivery.status === 'delivered' ? 'success' : 'info'}`}>
                        {delivery.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ) : (
          <div className="alert alert-success">No deliveries</div>
        )}
      </div>
    </div>
  );
};

export default DeliveryManagement;
