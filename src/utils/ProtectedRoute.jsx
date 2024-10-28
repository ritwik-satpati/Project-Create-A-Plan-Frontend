import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {

    const location = useLocation();

    const { user } = useSelector((state) => state.auth);

    if (!user) {
        const redirectPath = `/login?ref=${encodeURIComponent(location.pathname)}`;
        return <Navigate to={redirectPath} />;
    }

    return children ? children : <Outlet />;
};

export default ProtectedRoute;