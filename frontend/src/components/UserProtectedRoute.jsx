import React from "react";
import { Navigate } from "react-router";
// import { useAuth } from "../contexts/AdminAuthContext";

const UserProtectedRoute = ({ children }) => {
	const isAuthenticated = false;
	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

export default UserProtectedRoute;
