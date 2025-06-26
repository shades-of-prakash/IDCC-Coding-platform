import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);
	useEffect(() => {
		const checkAuth = () => {
			const token = localStorage.getItem("token");
			const userData = localStorage.getItem("user");

			setIsAuthenticated(!!token);
			setUser(userData ? JSON.parse(userData) : null);
		};

		checkAuth();

		window.addEventListener("storage", checkAuth);
		return () => {
			window.removeEventListener("storage", checkAuth);
		};
	}, []);

	const login = (token, userObject) => {
		localStorage.setItem("token", token);
		localStorage.setItem("user", JSON.stringify(userObject));
		setIsAuthenticated(true);
		setUser(userObject);
	};

	const logout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setIsAuthenticated(false);
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
