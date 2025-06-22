import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import FileUpload from "./components/Upload";
import Login from "./pages/Login.jsx";
import Landing from "./pages/Landing.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
function App() {
	return (
		<ThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Landing />} />
					<Route path="/admin-login" element={<AdminLogin />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/admin"
						element={
							<ProtectedRoute>
								<AdminLayout />
							</ProtectedRoute>
						}
					>
						<Route index element={<Navigate to="overview" />} />
						<Route path="overview" element={<div>Overview...</div>} />
						<Route path="contest" element={<FileUpload />} />
						<Route
							path="Submissions"
							element={
								<div>
									Submissions...<Link to="test">test</Link>
								</div>
							}
						/>
						<Route path="Settings" element={<div>Settings</div>} />
					</Route>
				</Routes>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
