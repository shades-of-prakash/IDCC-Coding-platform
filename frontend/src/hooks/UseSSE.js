import { useEffect } from "react";
import { useNavigate } from "react-router";

const useSSEStatus = (teamID) => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!teamID) return;

		const eventSource = new EventSource(`/api/v1/team_status/${teamID}`);

		eventSource.onmessage = (e) => {
			const data = JSON.parse(e.data);
			if (data.status === "accepted") {
				eventSource.close();
				localStorage.removeItem("teamID");
				navigate("/test");
			}
		};

		eventSource.onerror = () => {
			eventSource.close();
		};

		return () => eventSource.close();
	}, [teamID, navigate]);
};

export default useSSEStatus;
