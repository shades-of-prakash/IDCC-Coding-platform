import { useAuth } from "../contexts/AuthContext";
import { Navigate } from "react-router";

const PublicRoute = ({ children }) => {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return <Navigate to="/admin" replace />;
	}

	return children;
};

export default PublicRoute;
