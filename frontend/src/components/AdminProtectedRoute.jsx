import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext"; // adjust the path as needed

const ProtectedRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();

	if (!isAuthenticated) {
		return <Navigate to="/admin-login" replace />;
	}
	return children;
};

export default ProtectedRoute;
