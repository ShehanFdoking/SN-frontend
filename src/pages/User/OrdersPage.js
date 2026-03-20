import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as apiService from '../../services/apiService';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState({ status: '', page: 1, limit: 10 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await apiService.getMyOrders(filter);
      setOrders(response.data.orders);
    } catch (err) {
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    const classMap = {
      pending: 'badge-warning',
      accepted: 'badge-info',
      on_delivery: 'badge-info',
      completed: 'badge-success',
      cancelled: 'badge-danger'
    };
    return classMap[status] || 'badge-info';
  };

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <h1 style={{ marginBottom: '30px' }}>My Orders</h1>

        <div style={{ marginBottom: '30px' }}>
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value, page: 1 })}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ddd' }}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="accepted">Accepted</option>
            <option value="on_delivery">On Delivery</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        {loading ? (
          <div className="spinner"></div>
        ) : orders.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order.orderNumber}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.items.length} item(s)</td>
                  <td>${order.totalAmount.toFixed(2)}</td>
                  <td>
                    <span className={`badge ${getStatusBadgeClass(order.status)}`}>
                      {order.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <Link to={`/orders/${order._id}`} style={{ color: '#007bff' }}>
                      View Details →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="alert alert-success">
            No orders yet. <Link to="/products">Start shopping →</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
