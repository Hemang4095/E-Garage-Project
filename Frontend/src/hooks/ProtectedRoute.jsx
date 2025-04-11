// // src/hooks/ProtectedRoute.js
// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';

// const ProtectedRoute = ({ allowedRoles }) => {
//   const token = localStorage.getItem('token');
//   const role = localStorage.getItem('role');

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!allowedRoles.includes(role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return <Outlet />;
// };

// export default ProtectedRoute;


import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children , allowedRoles }) => {
    const role = localStorage.getItem("role"); // e.g., 'admin', 'garageowner', 'user'

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default ProtectedRoute;
