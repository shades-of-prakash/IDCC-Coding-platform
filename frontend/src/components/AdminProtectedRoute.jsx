import { Navigate } from "react-router";
import { useAdminAuth } from "../contexts/AdminAuthContext";

const AdminProtectedRoute = ({ children }) => {
	const { admin, loading } = useAdminAuth();

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="w-12 h-12 border-4 border-gray-300 border-t-green-600 rounded-full animate-spin" />
			</div>
		);
	}

	return admin ? children : <Navigate to="/admin/login" replace />;
};

export default AdminProtectedRoute;
