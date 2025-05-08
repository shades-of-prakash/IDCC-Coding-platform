import { useState } from "react";
import "./Upload.css";
import { FileJson } from "lucide-react";
import ValidationProgress from "./ValidationProgress";

const JsonUploader = ({ onContestCreated = () => {} }) => {
	const [validationData, setValidationData] = useState(null);
	const [formatError, setFormatError] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleFileUpload = (event) => {
		console.log("handleFileUpload called");
		const file = event.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const jsonData = JSON.parse(e.target.result);
					setFormatError(null);
					setValidationData(jsonData);
				} catch (err) {
					setFormatError("Error parsing JSON file: " + err.message);
					setValidationData(null);
				}
			};
			reader.readAsText(file);
		}
	};

	const uploadToDatabase = async (contestData, validationResults) => {
		console.log("uploadToDatabase called with:", contestData);
		const isValid = Object.values(validationResults).every(Boolean);

		if (!isValid) {
			setFormatError("Validation failed. Please check the requirements.");
			return;
		}

		setIsSubmitting(true);

		try {
			console.log("Sending data to server:", JSON.stringify(contestData));

			const response = await fetch(
				"http://localhost:5000/api/v1/contest/createNewContest",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(contestData),
				}
			);

			const responseData = await response.json();

			console.log("from ", responseData);

			if (!response.ok) {
				console.error("Server responded with error:", responseData);
				throw new Error(
					responseData.error ||
						responseData.details ||
						`HTTP error! status: ${response.status}`
				);
			}

			console.log("Contest created successfully:", responseData);
			onContestCreated(responseData.data);
			resetToUploader();
		} catch (err) {
			console.error("Error creating contest:", err);
			setFormatError(`Error creating contest: ${err.message}`);
		} finally {
			setIsSubmitting(false);
		}
	};

	const resetToUploader = () => {
		setValidationData(null);
		setFormatError(null);
		setValidationSteps({
			contestName: false,
			problemFormat: false,
			sixProblems: false,
		});
	};

	return (
		<div className="file_upload_main dfc">
			{!validationData && (
				<div className="upload">
					<label htmlFor="json_file_upload" className="dfc df_fd_c">
						<FileJson size="200px" strokeWidth="0.3px" />
						<span>Select a JSON file to upload</span>
						<span>or drag and drop here</span>
					</label>
					<input
						type="file"
						id="json_file_upload"
						accept=".json"
						onChange={handleFileUpload}
						className="file-input"
					/>
				</div>
			)}
			{formatError && !validationData && (
				<div className="error-message">{formatError}</div>
			)}
			{validationData && (
				<ValidationProgress
					data={validationData}
					error={formatError}
					setError={setFormatError}
					onRetry={resetToUploader}
					onValidationComplete={(data, results) =>
						uploadToDatabase(data, results)
					}
					isSubmitting={isSubmitting}
				/>
			)}
		</div>
	);
};

export default JsonUploader;
