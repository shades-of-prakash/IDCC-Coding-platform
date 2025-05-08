export const validateContestFormat = (data) => {
	const steps = {
		contestName: false,
		problemFormat: false,
		sixProblems: false,
	};

	try {
		if (!data || typeof data !== "object" || Array.isArray(data)) {
			throw new Error("JSON must be an object");
		}

		// Validate contest name
		if (typeof data.contestName === "string" && data.contestName.trim()) {
			steps.contestName = true;
		} else {
			throw new Error("contestName must be a non-empty string");
		}

		// Validate problems
		if (Array.isArray(data.problems)) {
			// Check if problems array has elements
			if (data.problems.length === 0) {
				throw new Error("problems array cannot be empty");
			}

			// Validate each problem
			data.problems.forEach((problem, index) => {
				validateProblem(problem, index);
			});
			steps.problemFormat = true;
		} else {
			throw new Error("problems must be an array");
		}

		// Validate number of problems
		if (data.problems.length >= 6) {
			steps.sixProblems = true;
		} else {
			throw new Error("Contest must contain at least 6 problems");
		}

		return { isValid: Object.values(steps).every(Boolean), steps };
	} catch (error) {
		console.error("Validation error:", error);
		return { isValid: false, steps, error: error.message };
	}
};

const validateProblem = (problem, index) => {
	if (!problem || typeof problem !== "object") {
		throw new Error(`Problem ${index + 1} must be an object`);
	}

	const requiredFields = [
		"problemId",
		"title",
		"description",
		"examples",
		"constraints",
		"visibleTestCases",
		"hiddenTestCases",
		"images",
		"starterFunctions",
	];

	requiredFields.forEach((field) => {
		if (!(field in problem)) {
			throw new Error(`Problem ${index + 1} is missing ${field}`);
		}
	});

	// Type checking
	if (typeof problem.problemId !== "number")
		throw new Error(`Problem ${index + 1}: problemId must be a number`);
	if (typeof problem.title !== "string" || !problem.title.trim())
		throw new Error(`Problem ${index + 1}: title must be a non-empty string`);
	if (typeof problem.description !== "string" || !problem.description.trim())
		throw new Error(
			`Problem ${index + 1}: description must be a non-empty string`
		);

	// Array validations
	const arrayFields = [
		"examples",
		"constraints",
		"visibleTestCases",
		"hiddenTestCases",
		"images",
	];
	arrayFields.forEach((field) => {
		if (!Array.isArray(problem[field])) {
			throw new Error(`Problem ${index + 1}: ${field} must be an array`);
		}
	});

	// Validate examples
	if (problem.examples.length === 0) {
		throw new Error(`Problem ${index + 1}: must have at least one example`);
	}

	problem.examples.forEach((example, exIndex) => {
		if (!example || typeof example !== "object") {
			throw new Error(
				`Problem ${index + 1}, Example ${exIndex + 1}: must be an object`
			);
		}

		if (
			!("input" in example) ||
			!("output" in example) ||
			!("explanation" in example)
		) {
			throw new Error(
				`Problem ${index + 1}, Example ${
					exIndex + 1
				}: must have input, output, and explanation`
			);
		}
	});

	// Validate test cases
	const testCases = [...problem.visibleTestCases, ...problem.hiddenTestCases];
	if (testCases.length === 0) {
		throw new Error(`Problem ${index + 1}: must have at least one test case`);
	}

	testCases.forEach((testCase, tcIndex) => {
		if (!testCase || typeof testCase !== "object") {
			throw new Error(
				`Problem ${index + 1}, Test Case ${tcIndex + 1}: must be an object`
			);
		}

		if (!("input" in testCase) || !("output" in testCase)) {
			throw new Error(
				`Problem ${index + 1}, Test Case ${
					tcIndex + 1
				}: must have input and output`
			);
		}
	});

	// Validate starter functions
	if (
		typeof problem.starterFunctions !== "object" ||
		Array.isArray(problem.starterFunctions)
	) {
		throw new Error(`Problem ${index + 1}: starterFunctions must be an object`);
	}

	const expectedLanguages = ["c", "java"];
	expectedLanguages.forEach((lang) => {
		if (
			!(lang in problem.starterFunctions) ||
			typeof problem.starterFunctions[lang] !== "string"
		) {
			throw new Error(
				`Problem ${
					index + 1
				}: starterFunctions must contain a string for ${lang}`
			);
		}
	});
};
