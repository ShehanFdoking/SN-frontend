import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as apiService from '../../services/apiService';

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await apiService.getOrderById(id);
      setOrder(response.data);
    } catch (err) {
      setError('Error loading order');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await apiService.cancelOrder(id);
        alert('Order cancelled');
        fetchOrder();
      } catch (err) {
        setError('Error cancelling order');
      }
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        {error && <div className="alert alert-error">{error}</div>}

        {order ? (
          <>
            <h1 style={{ marginBottom: '30px' }}>Order {order.orderNumber}</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '30px' }}>
              {/* Order Status */}
              <div className="card">
                <h3>Order Status</h3>
                <p><strong>Status:</strong> <span className="badge badge-info">{order.status.replace('_', ' ').toUpperCase()}</span></p>
                <p><strong>Payment Status:</strong> <span className="badge badge-warning">{order.paymentStatus}</span></p>
                <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
                <p><strong>Created:</strong> {new Date(order.createdAt).toLocaleString()}</p>

                {order.expectedDeliveryDate && (
                  <p><strong>Expected Delivery:</strong> {new Date(order.expectedDeliveryDate).toLocaleDateString()}</p>
                )}

                {order.status === 'pending' && (
                  <button onClick={handleCancelOrder} className="btn-secondary" style={{ marginTop: '15px' }}>
                    Cancel Order
                  </button>
                )}
              </div>

              {/* Delivery Address */}
              <div className="card">
                <h3>Delivery Address</h3>
                <p>{order.deliveryAddress?.street}</p>
                <p>{order.deliveryAddress?.city}, {order.deliveryAddress?.postalCode}</p>
                <p>{order.deliveryAddress?.country}</p>
                <p><strong>Phone:</strong> {order.deliveryAddress?.phone}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="card" style={{ marginBottom: '30px' }}>
              <h3>Order Items</h3>
              <table className="table" style={{ marginBottom: 0 }}>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item) => (
                    <tr key={item._id}>
                      <td>{item.productName}</td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>${item.totalPrice.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Delivery Updates */}
            {order.deliveryUpdates && order.deliveryUpdates.length > 0 && (
              <div className="card">
                <h3>Delivery Updates</h3>
                {order.deliveryUpdates.map((update, idx) => (
                  <div key={idx} style={{ marginBottom: '15px', paddingBottom: '15px', borderBottom: '1px solid #ddd' }}>
                    <p><strong>{new Date(update.date).toLocaleString()}</strong></p>
                    <p>{update.message}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="alert alert-error">Order not found</div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailPage;
