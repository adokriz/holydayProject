import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios'; // For logout functionality

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 
    
    useEffect(() => {
        const storedUser = localStorage.getItem('currentUser');
        if (storedUser !== undefined) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    // Login function
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('currentUser', JSON.stringify(userData));
    };

    // Logout function
    const logout = async () => {
        try {
            // Make a call to your PHP logout endpoint
            await axios.post('http://localhost/holyday/logout.php', {}, {
                withCredentials: true, // Send session cookie
            });
            setUser(null);
            localStorage.removeItem('currentUser'); // Clear local storage
        } catch (error) {
            console.error("Logout failed:", error);
            // Handle logout error (e.g., display message, but still clear local state)
            setUser(null);
            localStorage.removeItem('currentUser');
        }
    };

    const isAuthenticated = !!user; // Convert user object to boolean for login status

    const value = {
        user,
        isAuthenticated,
        login,
        logout,
        loading
    };

    if (loading) {
        return <div>Loading authentication status...</div>; // Or a spinner
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};