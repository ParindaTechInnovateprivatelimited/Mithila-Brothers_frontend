import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AddressBook from '../component/AddressBook';
import MyOrders from '../component/MyOrders';
import MyProfile from '../component/MyProfile';
import UserProfileLayout from '../../../../shared/UserProfileLayout';
import OrderDetailsPage from '../component/order_component/OrderDetails';

const UserProfile = () => {
    return (
        <Routes>
            <Route path="*" element={<UserProfileLayout />}>
                <Route path="" element={<Navigate to="profile" replace />} />
                <Route path="profile" element={<MyProfile />} />
                <Route path="orders" element={<MyOrders />} />
                <Route path="address-book" element={<AddressBook />} />
                <Route path="orders/details/:id" element={<OrderDetailsPage />} />
            </Route>
        </Routes>
    );
};

export default UserProfile;
