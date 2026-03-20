import React, { useState, useEffect } from 'react';
import * as apiService from '../../services/apiService';
import './OfficerPages.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    image: ''
  });
  const [loading, setLoading] = useState(false);
  const [originalImageUrl, setOriginalImageUrl] = useState('');
  const [aiEdited, setAiEdited] = useState(false);
  const [editingStockId, setEditingStockId] = useState(null);
  const [tempStock, setTempStock] = useState('');
  const [editingPriceId, setEditingPriceId] = useState(null);
  const [tempPrice, setTempPrice] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiService.getAllProducts({ limit: 100 });
      setProducts(response.data.products);
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const data = new FormData();
    data.append('image', file);

    try {
      setLoading(true);
      const res = await apiService.uploadImage(data);
      setOriginalImageUrl(res.data.imageUrl);
      setAiEdited(false);
      setFormData((prev) => ({ ...prev, image: res.data.imageUrl }));
    } catch (err) {
      console.error('Upload Error:', err);
      alert('Error uploading image');
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      await apiService.createProduct(formData);
      setFormData({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        image: ''
      });
      setOriginalImageUrl('');
      setAiEdited(false);
      setShowForm(false);
      fetchProducts();
      alert('Product added successfully');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Error adding product';
      alert(errorMsg);
    }
  };

  const handleAiEdit = async () => {
    const sourceUrl = originalImageUrl || formData.image;

    if (!sourceUrl) {
      alert('Please upload an image first');
      return;
    }

    try {
      setLoading(true);
      const res = await apiService.aiEditImage(sourceUrl);
      setFormData((prev) => ({ ...prev, image: res.data.imageUrl }));
      setAiEdited(true);
    } catch (err) {
      console.error('AI Edit Error:', err);
      const errorMsg = err.response?.data?.message || 'AI edit failed';
      alert(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await apiService.deleteProduct(id);
        fetchProducts();
        alert('Product deleted');
      } catch (err) {
        alert('Error deleting product');
      }
    }
  };

  const handleStockUpdate = async (id, currentProduct) => {
    try {
      setLoading(true);
      await apiService.updateProduct(id, {
        ...currentProduct,
        quantity: tempStock
      });
      setEditingStockId(null);
      fetchProducts();
      alert('Stock updated successfully');
    } catch (err) {
      console.error('Error updating stock:', err);
      alert('Error updating stock');
    } finally {
      setLoading(false);
    }
  };

  const handlePriceUpdate = async (id, currentProduct) => {
    try {
      setLoading(true);
      await apiService.updateProduct(id, {
        ...currentProduct,
        price: tempPrice
      });
      setEditingPriceId(null);
      fetchProducts();
      alert('Price updated successfully');
    } catch (err) {
      console.error('Error updating price:', err);
      alert('Error updating price');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickStockChange = async (id, currentProduct, delta) => {
    try {
      const newQuantity = parseInt(currentProduct.quantity) + delta;
      if (newQuantity < 0) return;

      await apiService.updateProduct(id, {
        ...currentProduct,
        quantity: newQuantity
      });
      fetchProducts();
    } catch (err) {
      console.error('Error updating stock quick:', err);
    }
  };

  return (
    <div className="officer-page-shell">
      <div className="container">
        <section className="officer-page-hero officer-page-hero-compact">
          <div>
            <p className="officer-page-eyebrow">Catalog Workspace</p>
            <h1>Manage Products</h1>
            <p>Control catalog entries, pricing, stock, and AI-enhanced product images.</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : 'Add Product'}
          </button>
        </section>

        {showForm && (
          <div className="officer-panel-card" style={{ marginBottom: '24px' }}>
            <h3>Add New Product</h3>
            <form onSubmit={handleAddProduct}>
              <div className="officer-form-grid">
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Category:</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="Vinegar">Vinegar</option>
                    <option value="Chutneys">Chutneys</option>
                    <option value="Chilli Paste">Chilli Paste</option>
                    <option value="Tomato Sauce">Tomato Sauce</option>
                    <option value="Cocoa Powder">Cocoa Powder</option>
                    <option value="Cinnamon">Cinnamon</option>
                    <option value="Spices">Spices</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Price (Rs.):</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Product Image:</label>
                  <input
                    type="file"
                    accept="image/jpeg, image/png, image/webp"
                    onChange={handleImageUpload}
                  />
                  <small style={{ display: 'block', marginTop: '6px', color: '#666' }}>
                    Upload first, then click AI Edit to remove background, add white background, and make it square.
                  </small>
                  {formData.image && (
                    <div className="officer-image-preview-block">
                      <img src={formData.image} alt="Preview" style={{ width: '100px', display: 'block', marginBottom: '10px' }} />
                      <button
                        type="button"
                        onClick={handleAiEdit}
                        className="btn-secondary"
                        style={{ padding: '6px 10px', fontSize: '12px', background: '#0f7acb', color: '#fff', borderColor: '#0f7acb' }}
                      >
                        AI Edit
                      </button>
                      {aiEdited && (
                        <small style={{ display: 'block', marginTop: '6px', color: '#2f6f44' }}>
                          AI edited preview applied.
                        </small>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows="4"
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-primary">
                Add Product
              </button>
            </form>
          </div>
        )}

        {loading ? (
          <div className="spinner"></div>
        ) : (
          <table className="table officer-table-polish">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td style={{ minWidth: '150px' }}>
                    {editingPriceId === product._id ? (
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <input
                          type="number"
                          value={tempPrice}
                          onChange={(e) => setTempPrice(e.target.value)}
                          style={{ width: '80px', padding: '5px' }}
                        />
                        <button
                          onClick={() => handlePriceUpdate(product._id, product)}
                          className="btn-primary"
                          style={{ padding: '5px 8px', fontSize: '11px' }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingPriceId(null)}
                          className="btn-secondary"
                          style={{ padding: '5px 8px', fontSize: '11px', background: '#666' }}
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>Rs. {product.price}</span>
                        <button
                          onClick={() => {
                            setEditingPriceId(product._id);
                            setTempPrice(product.price);
                          }}
                          style={{
                            padding: '4px 8px',
                            fontSize: '11px',
                            background: 'transparent',
                            border: '1px solid #28a745',
                            color: '#28a745',
                            borderRadius: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </td>
                  <td style={{ minWidth: '150px' }}>
                    {editingStockId === product._id ? (
                      <div style={{ display: 'flex', gap: '5px' }}>
                        <input
                          type="number"
                          value={tempStock}
                          onChange={(e) => setTempStock(e.target.value)}
                          style={{ width: '70px', padding: '5px' }}
                        />
                        <button
                          onClick={() => handleStockUpdate(product._id, product)}
                          className="btn-primary"
                          style={{ padding: '5px 8px', fontSize: '11px' }}
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingStockId(null)}
                          className="btn-secondary"
                          style={{ padding: '5px 8px', fontSize: '11px', background: '#666' }}
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => handleQuickStockChange(product._id, product, -1)}
                          style={{ padding: '2px 8px', borderRadius: '4px', border: '1px solid #ccc', background: '#f5f5f5', cursor: 'pointer' }}
                        >
                          -
                        </button>
                        <span style={{ minWidth: '30px', textAlign: 'center', fontWeight: 'bold' }}>{product.quantity}</span>
                        <button
                          onClick={() => handleQuickStockChange(product._id, product, 1)}
                          style={{ padding: '2px 8px', borderRadius: '4px', border: '1px solid #ccc', background: '#f5f5f5', cursor: 'pointer' }}
                        >
                          +
                        </button>
                        <button
                          onClick={() => {
                            setEditingStockId(product._id);
                            setTempStock(product.quantity);
                          }}
                          style={{
                            padding: '4px 8px',
                            fontSize: '11px',
                            background: 'transparent',
                            border: '1px solid var(--primary-color)',
                            color: 'var(--primary-color)',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            marginLeft: '5px'
                          }}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="btn-secondary"
                      style={{ padding: '5px 10px', fontSize: '12px' }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductManagement;
