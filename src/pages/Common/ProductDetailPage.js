import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as apiService from '../../services/apiService';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await apiService.getProductById(id);
      setProduct(response.data);

      const savedUser = localStorage.getItem('user');
      if (savedUser && response.data?.reviews?.length) {
        const currentUser = JSON.parse(savedUser);
        const myReview = response.data.reviews.find(
          (review) => review.userId?.toString() === currentUser.id
        );
        if (myReview) {
          setSelectedRating(Number(myReview.rating));
        }
      }
    } catch (err) {
      setError('Error loading product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    try {
      await apiService.addToCart({ productId: id, quantity: parseInt(quantity) });
      alert('Product added to cart!');
    } catch (err) {
      setError('Error adding to cart');
    }
  };

  const handleRateProduct = async () => {
    if (!selectedRating) {
      setError('Please select a rating from 1 to 5 stars');
      return;
    }

    try {
      setRatingLoading(true);
      setError('');
      await apiService.rateProduct(id, { rating: selectedRating });
      await fetchProduct();
      alert('Thank you! Your rating has been submitted.');
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error submitting rating';
      setError(errorMessage);
    } finally {
      setRatingLoading(false);
    }
  };

  if (loading) return <div className="spinner"></div>;

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        {error && <div className="alert alert-error">{error}</div>}
        
        {product ? (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div>
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: '100%', maxHeight: '500px', objectFit: 'cover', borderRadius: '10px' }}
                />
              )}
            </div>

            <div>
              <h1>{product.name}</h1>
              <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
                {product.description}
              </p>

              <div className="card" style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#007bff', marginBottom: '10px' }}>
                  ${product.price}
                </p>
                <p style={{ fontSize: '16px', color: '#666' }}>
                  Stock: <span style={{ fontWeight: 'bold' }}>{product.quantity} units</span>
                </p>
              </div>

              <div className="form-group">
                <label>Quantity:</label>
                <input
                  type="number"
                  min="1"
                  max={product.quantity}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  style={{ width: '100px' }}
                />
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.quantity === 0}
                className="btn-primary"
                style={{ padding: '15px 30px', fontSize: '16px', marginBottom: '20px' }}
              >
                {product.quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>

              {product.category && (
                <div className="card">
                  <p><strong>Category:</strong> {product.category}</p>
                  <p><strong>Rating:</strong> ⭐ {product.rating || 0}/5</p>
                  <p><strong>Reviews:</strong> {product.reviews?.length || 0}</p>
                  <div style={{ marginTop: '12px' }}>
                    <p style={{ marginBottom: '8px' }}><strong>Rate this product:</strong></p>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setSelectedRating(star)}
                          style={{
                            border: 'none',
                            background: 'transparent',
                            fontSize: '24px',
                            cursor: 'pointer',
                            color: selectedRating >= star ? '#f5b301' : '#bdbdbd',
                            padding: 0,
                            lineHeight: 1
                          }}
                        >
                          ★
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={handleRateProduct}
                      disabled={ratingLoading}
                      className="btn-primary"
                      style={{ padding: '8px 14px', fontSize: '14px' }}
                    >
                      {ratingLoading ? 'Submitting...' : 'Submit Rating'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="alert alert-error">Product not found</div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
