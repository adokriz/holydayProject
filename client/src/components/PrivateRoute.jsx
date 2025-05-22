import React from 'react';
import { useAuth } from './AuthProvider.jsx';
import { Navigate, Outlet } from 'react-router-dom'; // Outlet for nested routes

const PrivateRoute = () => {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Checking authentication...</div>; // Or a spinner
    }


    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;