# SNProducts Frontend

A React-based e-commerce frontend with support for three user roles: Admin, Officer, and User.

## Features

- **User Authentication** - Register, login, and profile management
- **Product Browsing** - Browse, search, and filter products by category
- **Shopping Cart** - Add items, manage quantities, view cart
- **Order Placement** - Create orders with delivery address
- **Order Tracking** - View order status and delivery updates
- **Notifications** - Real-time notifications for orders and deliveries
- **Officer Dashboard** - Manage products, orders, and deliveries
- **Admin Dashboard** - Monitor system activities and manage officers
- **News & Promotions** - View and create news/promotional content
- **Daily Reports** - Download activity reports as PDF
- **Responsive Design** - Mobile-friendly layout

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on `http://localhost:5000`

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

## Available Scripts

### `npm start`

Runs the app in development mode.

### `npm build`

Builds the app for production to the `build` folder.

### `npm test`

Launches the test runner.

## Project Structure

```
src/
├── pages/
│   ├── Auth/              # Login and Register pages
│   ├── Common/            # Shared pages (Home, Products, News, etc.)
│   ├── User/              # User-specific pages (Cart, Orders, etc.)
│   ├── Officer/           # Officer pages (Dashboard, Orders, Delivery, etc.)
│   └── Admin/             # Admin pages (Dashboard, Officers, Reports, etc.)
├── components/
│   └── Navbar/            # Navigation component
├── context/
│   ├── AuthContext.js     # Authentication state management
│   └── CartContext.js     # Shopping cart state management
├── services/
│   ├── api.js             # Axios API instance
│   └── apiService.js      # API service functions
├── App.js                 # Main app component with routing
└── index.js               # Entry point
```

## Pages Overview

### Common Pages

- **Home** - Landing page with quick actions
- **Products** - Browse, search, and filter products
- **Product Detail** - View product details and add to cart
- **News & Promotions** - View news and promotional content
- **Notifications** - View and manage notifications
- **Profile** - Update user information

### User Pages

- **Cart** - Manage shopping cart and place orders
- **Orders** - View order history and track status
- **Order Detail** - View detailed order information

### Officer Pages

- **Dashboard** - Quick access to officer functions
- **Product Management** - Add, edit, delete products
- **Order Management** - Accept pending orders
- **Delivery Management** - Track deliveries
- **Daily History** - View and download activity reports
- **News & Promotion Management** - Create and manage content

### Admin Pages

- **Dashboard** - Overview of system statistics
- **Officer Management** - Create and manage officers
- **Activity Reports** - View detailed activity reports

## Configuration

The frontend connects to the backend at `http://localhost:5000` by default. To change this, modify the proxy in `package.json` or set the `REACT_APP_API_URL` environment variable.

## API Integration

All API calls are made through the `apiService.js` file. The authentication token is automatically included in all requests via an axios interceptor.

## Authentication

- Users must register before accessing protected routes
- Login redirects Admin to `/admin-dashboard` and Officer to `/officer-dashboard`
- Regular users are redirected to the home page
- Authentication state is managed globally using Context API

## Cart Management

- Cart state is maintained in `CartContext`
- Items persist during the session
- Cart is cleared after successful order placement

## Role-Based Routing

Routes are protected based on user roles using the `ProtectedRoute` component:

- Public routes: Login, Register, Home, Products, News
- User routes: Cart, Orders, Profile
- Officer routes: Product Management, Order Management, Delivery, History
- Admin routes: Officer Management, Activity Reports

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Support

For issues or questions, please contact support.
