import React from "react";
import { Navigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

const UserProtectedRoute = ({ children }) => {
	const isAuthenticated = false;
	if (!isAuthenticated) {
		return <Navigate to="/login" replace />;
	}
	return children;
};

export default UserProtectedRoute;
