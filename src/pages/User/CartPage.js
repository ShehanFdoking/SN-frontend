import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import * as apiService from '../../services/apiService';

const CartPage = () => {
  const { cart, updateCart, clearCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState({
    street: '',
    city: '',
    postalCode: '',
    country: '',
    phone: ''
  });

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCart();
      updateCart(response.data);
    } catch (err) {
      setError('Error loading cart');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      await apiService.updateCartItemQuantity({ productId, quantity: parseInt(quantity) });
      fetchCart();
    } catch (err) {
      setError('Error updating quantity');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await apiService.removeFromCart({ productId });
      fetchCart();
    } catch (err) {
      setError('Error removing item');
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await apiService.createOrder({
        deliveryAddress,
        paymentMethod: 'cash_on_delivery'
      });
      alert('Order placed successfully!');
      clearCart();
      window.location.href = '/orders';
    } catch (err) {
      setError('Error placing order');
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <h1 style={{ marginBottom: '30px' }}>Shopping Cart</h1>

        {error && <div className="alert alert-error">{error}</div>}

        {!cart || cart.items.length === 0 ? (
          <div className="alert alert-success">
            Your cart is empty. <a href="/products">Continue shopping →</a>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '30px' }}>
            {/* Items List */}
            <div>
              {cart.items.map((item) => (
                <div key={item._id} className="card" style={{ marginBottom: '15px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '20px', alignItems: 'center' }}>
                    {item.productId?.image && (
                      <img
                        src={item.productId.image}
                        alt={item.productId?.name}
                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '5px' }}
                      />
                    )}

                    <div>
                      <h3 style={{ margin: '0 0 8px 0' }}>{item.productId?.name}</h3>
                      <p style={{ color: '#666', margin: '0 0 15px 0' }}>${item.price}</p>

                      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px' }}>
                        <label>Qty:</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item.productId._id, e.target.value)}
                          style={{ width: '60px', padding: '5px' }}
                        />
                        <p style={{ margin: 0 }}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
                      </div>

                      <button
                        onClick={() => handleRemoveItem(item.productId._id)}
                        className="btn-secondary"
                        style={{ padding: '8px 15px', fontSize: '12px' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Checkout */}
            <div>
              <div className="card" style={{ marginBottom: '20px' }}>
                <h2>Order Summary</h2>
                <hr />
                <div style={{ marginBottom: '15px' }}>
                  <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Subtotal:</span>
                    <span>${cart.totalPrice?.toFixed(2)}</span>
                  </p>
                  <p style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>Shipping:</span>
                    <span>$10.00</span>
                  </p>
                  <p style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold' }}>
                    <span>Total:</span>
                    <span>${((cart.totalPrice || 0) + 10).toFixed(2)}</span>
                  </p>
                </div>
              </div>

              <div className="card">
                <h3>Delivery Address</h3>
                <div className="form-group">
                  <label>Phone:</label>
                  <input
                    type="tel"
                    value={deliveryAddress.phone}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, phone: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Street:</label>
                  <input
                    type="text"
                    value={deliveryAddress.street}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, street: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>City:</label>
                  <input
                    type="text"
                    value={deliveryAddress.city}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, city: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Postal Code:</label>
                  <input
                    type="text"
                    value={deliveryAddress.postalCode}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, postalCode: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Country:</label>
                  <input
                    type="text"
                    value={deliveryAddress.country}
                    onChange={(e) => setDeliveryAddress({ ...deliveryAddress, country: e.target.value })}
                  />
                </div>

                <button
                  onClick={handlePlaceOrder}
                  className="btn-primary"
                  style={{ width: '100%', padding: '15px', fontSize: '16px' }}
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
