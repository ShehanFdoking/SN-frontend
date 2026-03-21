import api from './api';

// Auth Services
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getCurrentUser = () => api.get('/auth/me');

// User Services
export const getUserProfile = (id) => api.get(`/users/${id}`);
export const updateUserProfile = (data) => api.put('/users/profile/update', data);
export const changePassword = (data) => api.post('/users/change-password', data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Product Services
export const getAllProducts = (params) => api.get('/products', { params });
export const getProductById = (id) => api.get(`/products/${id}`);
export const rateProduct = (id, data) => api.post(`/products/${id}/rate`, data);
export const createProduct = (data) => api.post('/products', data);
export const updateProduct = (id, data) => api.put(`/products/${id}`, data);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const getProductCategories = () => api.get('/products/categories');

// Cart Services
export const getCart = () => api.get('/cart');
export const addToCart = (data) => api.post('/cart/add', data);
export const removeFromCart = (data) => api.post('/cart/remove', data);
export const updateCartItemQuantity = (data) => api.post('/cart/update-quantity', data);
export const clearCart = () => api.post('/cart/clear');

// Order Services
export const createOrder = (data) => api.post('/orders', data);
export const getMyOrders = (params) => api.get('/orders/my-orders', { params });
export const getOrderById = (id) => api.get(`/orders/${id}`);
export const updateOrder = (id, data) => api.put(`/orders/${id}`, data);
export const cancelOrder = (id) => api.post(`/orders/${id}/cancel`);
export const getAllOrders = (params) => api.get('/orders', { params });
export const deleteOrder = (id) => api.delete(`/orders/${id}`);

// Notification Services
export const getMyNotifications = (params) => api.get('/notifications', { params });
export const getNotificationById = (id) => api.get(`/notifications/${id}`);
export const createNotification = (data) => api.post('/notifications', data);
export const markNotificationAsRead = (id) => api.put(`/notifications/${id}/read`);
export const markAllNotificationsAsRead = () => api.post('/notifications/mark-all-read');
export const deleteNotification = (id) => api.delete(`/notifications/${id}`);

// News & Promo Services
export const getAllNewsAndPromos = (params) => api.get('/news', { params });
export const getNewsPromoById = (id) => api.get(`/news/${id}`);
export const createNewsPromo = (data) => api.post('/news', data);
export const updateNewsPromo = (id, data) => api.put(`/news/${id}`, data);
export const deleteNewsPromo = (id) => api.delete(`/news/${id}`);

// Delivery Services
export const acceptOrder = (data) => api.post('/delivery/accept-order', data);
export const rescheduleDelivery = (data) => api.post('/delivery/reschedule', data);
export const updateDeliveryStatus = (id, data) => api.put(`/delivery/status/${id}`, data);
export const getDeliveries = (params) => api.get('/delivery', { params });
export const getDeliveryById = (id) => api.get(`/delivery/${id}`);
export const completeDelivery = (id, data) => api.post(`/delivery/complete/${id}`, data);
export const deleteDelivery = (id) => api.delete(`/delivery/${id}`);

// History Services
export const getOfficerHistory = (params) => api.get('/history', { params });
export const getDailyHistory = (params) => api.get('/history/daily', { params });
export const generateHistoryPDF = (params) =>
  api.get('/history/pdf', {
    params,
    responseType: 'blob'
  });

// Admin Services
export const createOfficer = (data) => api.post('/admin/officers', data);
export const createAdminPromotionRequest = (data) => api.post('/admin/admin-promotion-requests', data);
export const getAdminPromotionRequests = (params) => api.get('/admin/admin-promotion-requests', { params });
export const approveAdminPromotionRequest = (id) => api.post(`/admin/admin-promotion-requests/${id}/approve`);
export const rejectAdminPromotionRequest = (id, data) => api.post(`/admin/admin-promotion-requests/${id}/reject`, data);
export const getAllOfficers = () => api.get('/admin/officers');
export const getOfficerById = (id) => api.get(`/admin/officers/${id}`);
export const updateOfficer = (id, data) => api.put(`/admin/officers/${id}`, data);
export const deactivateOfficer = (id) => api.put(`/admin/officers/${id}/deactivate`);
export const reactivateOfficer = (id) => api.put(`/admin/officers/${id}/reactivate`);
export const deleteOfficer = (id) => api.delete(`/admin/officers/${id}`);
export const getAdminDashboard = () => api.get('/admin/dashboard');
export const getOfficerActivitySummary = (params) => api.get('/admin/activity-summary', { params });

// Upload Services
export const uploadImage = (formData) => api.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

export const aiEditImage = (imageUrl) => api.post('/upload/ai-edit', { imageUrl });
