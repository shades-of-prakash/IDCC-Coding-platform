import "./Upload.css";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Loader } from "lucide-react";
import { validateContestFormat } from "../../utils/validateContestFormat";

const ValidationProgress = ({
	data,
	error,
	setError,
	onRetry,
	onValidationComplete,
	isSubmitting = false,
}) => {
	const [hasValidated, setHasValidated] = useState(false);

	const [validationSteps, setValidationSteps] = useState({
		contestName: false,
		problemFormat: false,
		sixProblems: false,
	});

	useEffect(() => {
		if (!hasValidated) {
			const validateData = () => {
				const { isValid, steps, error } = validateContestFormat(data);
				setValidationSteps(steps);

				if (error) {
					setError(error);
				} else {
					setError(null);
					// Only trigger onValidationComplete if validation is successful
					// and we're not already submitting
					if (isValid && onValidationComplete && !isSubmitting) {
						onValidationComplete(data, steps);
					}
				}
				setHasValidated(true);
			};

			validateData();
		}
	}, [
		data,
		setError,
		setValidationSteps,
		onValidationComplete,
		hasValidated,
		isSubmitting,
	]);

	return (
		<div className="validation-process">
			<h3>Validation Process:</h3>
			<div className="validation-step">
				{validationSteps.contestName ? (
					<CheckCircle color="#28a745" size={20} />
				) : (
					<XCircle color="#dc3545" size={20} />
				)}
				<span>Valid contestName</span>
			</div>
			<div className="validation-step">
				{validationSteps.problemFormat ? (
					<CheckCircle color="#28a745" size={20} />
				) : (
					<XCircle color="#dc3545" size={20} />
				)}
				<span>Valid problem format</span>
			</div>
			<div className="validation-step">
				{validationSteps.sixProblems ? (
					<CheckCircle color="#28a745" size={20} />
				) : (
					<XCircle color="#dc3545" size={20} />
				)}
				<span>At least 6 problems</span>
			</div>

			{isSubmitting && (
				<div className="submitting-state">
					<Loader className="animate-spin" size={20} />
					<span>Submitting to server...</span>
				</div>
			)}

			{error && (
				<div className="error-message">
					Error: {error}
					<button
						className="retry_button"
						onClick={onRetry}
						disabled={isSubmitting}
					>
						Try Again
					</button>
				</div>
			)}
		</div>
	);
};

export default ValidationProgress;
