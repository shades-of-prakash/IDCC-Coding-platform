import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router";
import AdminLayout from "./layouts/AdminLayout";
import { ThemeProvider } from "./contexts/ThemeContext";
import FileUpload from "./components/Upload";
import Login from "./pages/Login.jsx";
import Landing from "./pages/Landing.jsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";
import AdminLogin from "./pages/AdminLogin.jsx";
import { AdminAuthProvider } from "./contexts/AdminAuthContext.jsx";
import AdminPublicRoute from "./components/AdminPublicRoute.jsx";
import UserProtectedRoute from "./components/UserProtectedRoute.jsx";
import Test from "./components/Test.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
	const queryClient = new QueryClient();
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider>
				<AdminAuthProvider>
					<BrowserRouter>
						<Routes>
							<Route
								path="/"
								element={
									<UserProtectedRoute>
										<Landing />
									</UserProtectedRoute>
								}
							/>

							<Route path="/test" element={<Test />} />

							<Route
								path="/admin/login"
								element={
									<AdminPublicRoute>
										<AdminLogin />
									</AdminPublicRoute>
								}
							/>
							<Route path="/login" element={<Login />} />
							<Route
								path="/admin"
								element={
									<AdminProtectedRoute>
										<AdminLayout />
									</AdminProtectedRoute>
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
				</AdminAuthProvider>
			</ThemeProvider>
		</QueryClientProvider>
	);
}

export default App;
