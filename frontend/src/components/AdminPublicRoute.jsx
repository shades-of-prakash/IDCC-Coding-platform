import { useAdminAuth } from "../contexts/AdminAuthContext";
import { Navigate } from "react-router";

const PublicRoute = ({ children }) => {
	const { isAuthenticated, loading } = useAdminAuth();
	if (loading) return null;
	if (isAuthenticated) {
		return <Navigate to="/admin" replace />;
	}

	return children;
};

export default PublicRoute;
