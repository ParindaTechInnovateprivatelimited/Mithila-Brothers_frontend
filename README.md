# Mithila Borther Frontend - EliteZone

This is a full-stack eCommerce web application built with React, featuring both a user-facing storefront and an admin panel accessible via the `/admin` route.

## Features

### User-Facing Features
- **Product Browsing**: Users can view a variety of products available for purchase.
- **Product Search**: Search for products based on category or keywords.
- **Shopping Cart**: Add products to the shopping cart and proceed to checkout.
- **User Authentication**: Sign up, log in, and manage user profiles.
- **Order Management**: Users can view their order history and track current orders.

### Admin Panel
- **Dashboard**: View total sales, user activity, and other business metrics.
- **Manage Products**: Add, update, and delete products from the catalog.
- **Manage Orders**: View and update the status of orders placed by users.
- **Manage Users**: Admin can view and manage user information.

## Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) package manager
- A code editor like [VSCode](https://code.visualstudio.com/)

### Steps to Set Up the Project

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/ecommerce-frontend.git
   cd ecommerce-frontend
   ```

2. **Install Dependencies**:
   - Using npm:
     ```bash
     npm install
     ```
   - Or using yarn:
     ```bash
     yarn install
     ```

3. **Environment Variables**:
   Create a `.env` file in the root directory and configure it with the following environment variables:
   ```bash
   REACT_APP_API_BASE_URL=http://localhost:3000
   REACT_APP_ADMIN_PANEL_URL=http://localhost:3000/admin
   ```

4. **Run the Project**:
   Start the React development server:
   - Using npm:
     ```bash
     npm start
     ```
   - Or using yarn:
     ```bash
     yarn start
     ```

   This will start the application at `http://localhost:3000` by default.

## Directory Structure

```bash
.
├── public/
│   └── index.html
├── src/
│   ├── assets/           # Static assets (images, icons, etc.)
│   ├── components/       # Reusable components (Header, Footer, etc.)
│   ├── pages/            # React components representing pages (Home, Cart, Admin, etc.)
│   ├── redux/            # Redux store and actions for state management
│   ├── services/         # API calls and related logic
│   ├── App.js            # Main component with routing setup
│   ├── index.js          # Entry point for the application
│   └── style/            # Global styles and themes
├── .env                  # Environment variables (API URLs, etc.)
└── package.json          # Project dependencies and scripts
```

## Admin Panel

The admin panel can be accessed by navigating to the `/admin` route after logging in as an admin. This panel is protected and can only be accessed by authorized users with the correct credentials.

### Admin Routes

- **Login**: `/admin/login` - Admin login page.
- **Dashboard**: `/admin` - Overview of sales and activities.
- **Product Management**: `/admin/products` - Add, edit, or delete products.
- **Order Management**: `/admin/orders` - View and manage orders.
- **User Management**: `/admin/users` - View and manage users.

## Technologies Used
- **React**: JavaScript library for building user interfaces.
- **React Router**: For routing and navigation.
- **Redux**: For state management across the application.
- **Axios**: For making HTTP requests to the backend.
- **Material-UI**: For building responsive and customizable UI components.
- **React Hooks**: For managing state and side-effects in functional components.
- **Firebase Authentication**: For user authentication.

## Contributing

We welcome contributions! To contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to your branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements
- Thanks to [Tailwind CSS](https://mui.com/) for their amazing component library.
- [React Router](https://reactrouter.com/) for managing our app's navigation.
- [Redux](https://redux.js.org/) for simplifying state management.
# Mithila-Brothers_frontend
