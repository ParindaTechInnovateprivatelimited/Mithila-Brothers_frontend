import React, { useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './Layout';
import OverviewPage from './pages/OverviewPage';
import OrdersPage from './pages/OrdersPage';
import UsersPage from './pages/UsersPage';
import ProductsPage from './pages/ProductsPage';
import PrivateRoute from './PrivateRoute';
import Login from './auth/Login';
import { useDispatch } from 'react-redux';
import { fetchAdminUserData } from '../../redux/slices/adminAuthSlice';
import AdminLoginRoute from '../routes/AdminLoginRoute'
import CampaignPage from './pages/CampaignPage';
import { getOffers } from '../../redux/slices/categorySlice';
import { fetchAdminStats, fetchOrders, fetchProducts, fetchUsers } from '../../redux/slices/adminSlice';

const Admin = () => {
    const dispatch = useDispatch();
    const adminToken = localStorage.getItem('adminToken');

    useEffect(() => {
        if (adminToken) {
            dispatch(fetchAdminStats())
            dispatch(getOffers())
            dispatch(fetchOrders())
            dispatch(fetchProducts())
            dispatch(fetchAdminUserData());
            dispatch(fetchUsers())
        }
    }, [dispatch, adminToken]);

    return (
        <div className='bg-[#f8f8f8] z-0'>
            {/* Background */}
            {/* <div className='fixed inset-0 z-0'>
                <div className='absolute inset-0 bg-gradient-to-br from-[#f8f8f8] via-[#F8F8F8] to-[#f8f8f8] opacity-80' />
                <div className='absolute inset-0 backdrop-blur-sm' />
            </div> */}
            <Routes>
                <Route path="*" element={<Layout />}>
                    <Route
                        path=""
                        element={
                            <PrivateRoute>
                                <Navigate to="campaign" replace />
                            </PrivateRoute>
                        }
                    />
                    {/* <Route
                        path="dashboard"
                        element={
                            <PrivateRoute>
                                <OverviewPage />
                            </PrivateRoute>
                        }
                    /> */}
                    {/* <Route
                        path="products"
                        element={
                            <PrivateRoute>
                                <ProductsPage />
                            </PrivateRoute>
                        }
                    /> */}
                    {/* <Route
                        path="orders"
                        element={
                            <PrivateRoute>
                                <OrdersPage />
                            </PrivateRoute>
                        }
                    /> */}
                    {/* <Route
                        path="customers"
                        element={
                            <PrivateRoute>
                                <UsersPage />
                            </PrivateRoute>
                        }
                    /> */}
                    <Route
                        path="campaign"
                        element={
                            <PrivateRoute>
                                <CampaignPage />
                            </PrivateRoute>
                        }
                    />
                    
                </Route>
                <Route path='login' element={
                        <AdminLoginRoute>
                            <Login />
                        </AdminLoginRoute>
                    } />
            </Routes>
        </div>
    );
};

export default Admin;
