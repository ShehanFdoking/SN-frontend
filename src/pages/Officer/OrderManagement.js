import React, { useState, useEffect } from 'react';
import * as apiService from '../../services/apiService';
import './OfficerPages.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [expectedDate, setExpectedDate] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllOrders({ status: 'pending', limit: 50 });
      setOrders(response.data.orders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOrder = async () => {
    if (!selectedOrder || !expectedDate) {
      alert('Please select an order and delivery date');
      return;
    }

    try {
      await apiService.acceptOrder({
        orderId: selectedOrder._id,
        expectedDeliveryDate: expectedDate
      });
      alert('Order accepted');
      setSelectedOrder(null);
      setExpectedDate('');
      fetchOrders();
    } catch (err) {
      alert('Error accepting order');
    }
  };

  return (
    <div className="officer-page-shell">
      <div className="container">
        <section className="officer-page-hero officer-page-hero-compact">
          <div>
            <p className="officer-page-eyebrow">Order Pipeline</p>
            <h1>Order Management</h1>
            <p>Review pending orders, inspect customer details, and assign expected delivery dates.</p>
          </div>
          <span className="officer-page-tag">Pending Queue</span>
        </section>

        <div className="officer-grid-layout">
          <div>
            {loading ? (
              <div className="spinner"></div>
            ) : orders.length > 0 ? (
              <div className="officer-panel-card">
                <div className="officer-panel-head">
                  <h3>Pending Orders</h3>
                  <span className="officer-panel-pill">{orders.length} waiting</span>
                </div>

                <table className="table officer-table-polish">
                  <thead>
                    <tr>
                      <th>Order</th>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.orderNumber}</td>
                        <td>{order.userId?.firstName} {order.userId?.lastName}</td>
                        <td>Rs. {order.totalAmount}</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="btn-primary"
                            style={{ padding: '6px 12px', fontSize: '12px' }}
                          >
                            Open
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="alert alert-success">No pending orders</div>
            )}
          </div>

          {selectedOrder && (
            <aside className="officer-panel-card officer-side-panel">
              <h3>Accept Order</h3>
              <p><strong>Order:</strong> {selectedOrder.orderNumber}</p>
              <p><strong>Customer:</strong> {selectedOrder.userId?.firstName} {selectedOrder.userId?.lastName}</p>
              <p><strong>Amount:</strong> Rs. {selectedOrder.totalAmount}</p>

              <div className="form-group">
                <label>Expected Delivery Date:</label>
                <input
                  type="date"
                  value={expectedDate}
                  onChange={(e) => setExpectedDate(e.target.value)}
                />
              </div>

              <button
                onClick={handleAcceptOrder}
                className="btn-primary"
                style={{ width: '100%' }}
              >
                Accept Order
              </button>

              <button
                onClick={() => setSelectedOrder(null)}
                className="btn-secondary"
                style={{ width: '100%', marginTop: '10px' }}
              >
                Close
              </button>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
