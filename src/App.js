import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


import { demoProducts } from './demo';


import { fetchAdminUserData } from './redux/slices/adminAuthSlice';
import { fetchUserData } from './redux/slices/authSlice';
import { fetchCartItems } from './redux/slices/cartSlice';
import { getWishlist } from './redux/slices/wishListSlice';
import { fetchAddresses } from './redux/slices/addressSlice';
import { getOrders } from './redux/slices/orderSlice';
import { fetchAllProducts, fetchCategory, setProducts } from './redux/slices/productSlice';

import Error404 from './shared/Error404'
import User from './components/user/User'
import Admin from './components/admin/Admin';
import { getCategories, getOffers, getSubCategories, } from './redux/slices/categorySlice';
import Success from './components/user/checkout/pages/Success';
import { fetchAdminStats, fetchOrders, fetchProducts, fetchUsers } from './redux/slices/adminSlice';
import ScrollToTop from './shared/Scroll';

function App() {

  const token = localStorage.getItem('token');
  const adminToken = localStorage.getItem('adminToken');
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);



  useEffect(() => {
      if (adminToken) {
      }
  }, [dispatch, adminToken]);


  useEffect(() => {
    dispatch(setProducts(demoProducts));
    dispatch(getCategories())
    dispatch(getSubCategories())
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (adminToken) {
      dispatch(fetchAdminUserData());
      dispatch(fetchAdminStats())
      dispatch(getOffers())
      dispatch(fetchOrders())
      dispatch(fetchProducts())
      dispatch(fetchAdminUserData());
      dispatch(fetchUsers())
    }
  }, [dispatch, adminToken]);


  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(fetchCategory('newarrivals'));
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getOrders());
      dispatch(fetchAddresses());
      dispatch(getWishlist());
      const fetchCartItem = async () => {
        try {
          dispatch(fetchCartItems());
        } catch (error) {
          console.error('Error fetching cart items:', error);
        }
      };

      fetchCartItem();
    }
  }, [user, dispatch]);

  return (
    <Router>
    <ScrollToTop />
      <Routes>
        <Route
          path="/*"
          element={
            <User />
          }
        />
        <Route
          path="/admin/*"
          element={
            <Admin />
          }
        />
        <Route path="/result" element={<Success />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
