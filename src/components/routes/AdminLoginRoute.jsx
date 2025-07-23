import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminLoginRoute = ({ children }) => {
    const user = useSelector((state) => state.adminAuth.user);

    if (user) {
        return <Navigate to="/admin/campaign" />;
    }
    return children;
};

export default AdminLoginRoute;