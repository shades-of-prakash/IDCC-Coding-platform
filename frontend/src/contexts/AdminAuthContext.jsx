import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithHandler from "../utils/fetchHandler";
// import { isAuthError } from "../utils/isAuthError";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
	const queryClient = useQueryClient();

	// 🔐 SESSION QUERY
	const {
		data: admin,
		isLoading: loading,
		isError,
		error,
	} = useQuery({
		queryKey: ["admin-session"],
		queryFn: async () => {
			try {
				const res = await fetchWithHandler("/api/v1/admin/session", {
					credentials: "include",
				});
				return res.data.user || null;
			} catch (err) {
				if (
					!(err.status === 401 || err.message.includes("Not authenticated"))
				) {
					console.error("Session check error:", err);
				}
				return null;
				throw err;
			}
		},
		staleTime: 1000 * 60 * 5,
		refetchOnWindowFocus: false,
		onError: (err) => {
			if (!(err.status === 401 || err.message.includes("Not authenticated"))) {
				console.error("Session check error:", err);
			}
			queryClient.setQueryData(["admin-session"], null);
		},
	});

	// 🔑 LOGIN MUTATION
	const login = useMutation({
		mutationFn: async ({ username, password }) => {
			const res = await fetchWithHandler("/api/v1/admin/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});
			return res.data.user;
		},
		onSuccess: (user) => {
			queryClient.setQueryData(["admin-session"], user);
		},
		onError: () => {
			queryClient.setQueryData(["admin-session"], null);
		},
	});

	// 🚪 LOGOUT MUTATION
	const logout = useMutation({
		mutationFn: () =>
			fetchWithHandler("/api/v1/admin/logout", { method: "POST" }),
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: ["admin-session"] });
		},
	});

	return (
		<AdminAuthContext.Provider
			value={{
				admin,
				loading,
				isError,
				error,
				login: login.mutate,
				loginStatus: login,
				logout: logout.mutate,
				logoutStatus: logout,
			}}
		>
			{children}
		</AdminAuthContext.Provider>
	);
};

export const useAdminAuth = () => useContext(AdminAuthContext);
