import React, { createContext, useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import fetchWithHandler from "../utils/fetchHandler";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
	const queryClient = useQueryClient();
	const [hasLoggedIn, setHasLoggedIn] = useState(false);

	// 🔐 SESSION QUERY (disabled initially)
	const {
		data: admin,
		isLoading: loading,
		isError,
		error,
		refetch: refetchSession,
	} = useQuery({
		queryKey: ["admin-session"],
		queryFn: async () => {
			const res = await fetchWithHandler("/api/v1/admin/session", {
				credentials: "include",
			});
			return res.data.user || null;
		},
		enabled: hasLoggedIn, // only run after login
		refetchOnWindowFocus: false,
		staleTime: 1000 * 60 * 5,
	});

	// 🔑 LOGIN MUTATION
	const loginMutation = useMutation({
		mutationFn: async ({ username, password }) => {
			const res = await fetchWithHandler("/api/v1/admin/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ username, password }),
			});
			return res.data.user;
		},
		onSuccess: async () => {
			setHasLoggedIn(true); // enable session check
			await refetchSession(); // manually refetch session
		},
	});

	// 🚪 LOGOUT MUTATION
	const logoutMutation = useMutation({
		mutationFn: () =>
			fetchWithHandler("/api/v1/admin/logout", { method: "POST" }),
		onSuccess: () => {
			queryClient.removeQueries({ queryKey: ["admin-session"] });
			setHasLoggedIn(false); // prevent session from auto refetching
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
