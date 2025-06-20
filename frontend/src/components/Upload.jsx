// import "./Upload.css";
import { useState, useEffect, useCallback } from "react";
import JsonUploader from "./JsonUploader";
import ContestComponent from "./Contest";

const FileUpload = () => {
	const [showUploader, setShowUploader] = useState(true);
	const [showPopupUploader, setShowPopupUploader] = useState(false);
	const [existingContests, setExistingContests] = useState([]);
	const [loading, setLoading] = useState(true);

	const fetchContests = useCallback(async () => {
		try {
			const response = await fetch(
				"http://localhost:5000/api/v1/contest/getAllContests"
			);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const data = await response.json();
			if (data && data.data.length > 0) {
				setShowUploader(false);
			}
			setExistingContests(data.data || []);
		} catch (error) {
			console.error("Error fetching contests:", error);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		fetchContests();
	}, [fetchContests]);

	const handleContestCreated = (newContest) => {
		setExistingContests((prev) => [...prev, newContest]);
		setShowUploader(false);
		setShowPopupUploader(false);
	};

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div className="file_upload">
			<div className="file_upload_des df df_jc_space df_ai_center">
				<div className="des">
					<p>Create Contest</p>
					<span>upload JSON files to create new contest</span>
				</div>
				{existingContests.length > 0 && (
					<button
						className="upload_button dfc"
						onClick={() => setShowPopupUploader((prev) => !prev)}
						style={{ cursor: "pointer" }}
					>
						Create contest
					</button>
				)}
				{showPopupUploader && (
					<JsonUploader onContestCreated={handleContestCreated} />
				)}
			</div>

			{showUploader && <JsonUploader onContestCreated={handleContestCreated} />}

			{existingContests.length > 0 && (
				<ContestComponent contestData={existingContests} />
			)}
		</div>
	);
};

export default FileUpload;
