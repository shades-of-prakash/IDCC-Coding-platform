// components/ProtectedRoute.jsx
import { Navigate } from "react-router";

const ProtectedRoute = ({ children }) => {
	const token = localStorage.getItem("token");

	if (!token) {
		return <Navigate to="/admin-login" replace />;
	}

	return children;
};

export default ProtectedRoute;
