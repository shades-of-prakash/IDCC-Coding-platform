// src/contexts/AdminAuthContext.js
import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router"; // Add this import
import fetchWithHandler from "../utils/fetchHandler";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
	const queryClient = useQueryClient();
	const location = useLocation();
	const isLoginPage = location.pathname === "/admin/login";
	const {
		data: admin,
		isLoading: loading,
		isError,
		error,
		refetch: refetchSession,
	} = useQuery({
		queryKey: ["admin-session"],
		queryFn: async () => {
			try {
				const res = await fetchWithHandler("/api/v1/admin/session");
				return res.data.user || null;
			} catch (error) {
				if (error.message.includes("401")) {
					return null;
				}
				throw error;
			}
		},
		enabled: !isLoginPage,
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 5,
		retry: false,
	});

	const loginMutation = useMutation({
		mutationFn: async ({ username, password }) => {
			const res = await fetchWithHandler("/api/v1/admin/login", {
				method: "POST",
				body: JSON.stringify({ username, password }),
			});
			return res.data.user;
		},
		onSuccess: async () => {
			await refetchSession();
		},
	});

	const logoutMutation = useMutation({
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
				login: loginMutation.mutate,
				loginStatus: loginMutation,
				logout: logoutMutation.mutate,
				logoutStatus: logoutMutation,
			}}
		>
			{children}
		</AdminAuthContext.Provider>
	);
};

export const useAdminAuth = () => useContext(AdminAuthContext);
