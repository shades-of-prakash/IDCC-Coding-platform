import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useSSEStatus from "../hooks/UseSSE";

const AuthContext = createContext();

export const UserAuthProvider = ({ children }) => {
	const [teamID, setTeamID] = useState(() => localStorage.getItem("teamID"));
	const [teamStatus, setTeamStatus] = useState(teamID ? "pending" : null);
	const navigate = useNavigate();
	useEffect(() => {
		if (!teamID) return;

		const eventSource = new EventSource(`/api/v1/team_status/${teamID}`);

		eventSource.onmessage = (e) => {
			const data = JSON.parse(e.data);
			if (data.status === "accepted") {
				eventSource.close();
				localStorage.removeItem("teamID");
				setTeamID(null);
				setTeamStatus("accepted");
				navigate("/test");
			}
		};

		eventSource.onerror = () => {
			eventSource.close();
		};

		return () => eventSource.close();
	}, [teamID, navigate]);

	const login = (newTeamID) => {
		localStorage.setItem("teamID", newTeamID);
		setTeamID(newTeamID);
		setTeamStatus("pending");
	};

	const logout = () => {
		localStorage.removeItem("teamID");
		setTeamID(null);
		setTeamStatus(null);
	};

	return (
		<AuthContext.Provider value={{ teamID, teamStatus, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useUserAuth = () => useContext(AuthContext);
